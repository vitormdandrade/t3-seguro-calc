import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getResend } from '@/lib/resend';
import { generateReportPdfBuffer } from '@/lib/pdf/generateReportPdf';
import { ReportData, QuoteInsurer } from '@/lib/pdf/ReportPDF';

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe não configurado.' },
        { status: 500 }
      );
    }

    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret não configurado.' },
        { status: 500 }
      );
    }

    // Read raw body
    const rawBody = await request.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature.' },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const customerEmail = session.customer_details?.email || session.customer_email || '';

      console.log(`Payment completed for session ${session.id}, email: ${customerEmail}`);

      try {
        // Parse metadata
        const quotes: QuoteInsurer[] = metadata.quotes
          ? JSON.parse(metadata.quotes)
          : [];
        const userInputs: Record<string, string> = metadata.userInputs
          ? JSON.parse(metadata.userInputs)
          : {};
        const recommendations: string[] = metadata.recommendations
          ? JSON.parse(metadata.recommendations)
          : [];

        const reportData: ReportData = {
          insuranceType: metadata.insuranceType || 'auto',
          insuranceTypeLabel: getInsuranceLabel(metadata.insuranceType || 'auto'),
          userInputs,
          estimatedPrice: metadata.estimatedPrice || 'N/A',
          quotes,
          recommendations,
          generatedAt: new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        // Generate PDF
        const pdfBuffer = await generateReportPdfBuffer(reportData);

        // Send email with PDF
        if (customerEmail) {
          await sendReportEmail(customerEmail, pdfBuffer, reportData);
        }

        // Store PDF for later retrieval (store in metadata or external storage)
        // For now, we'll generate on-the-fly when the /relatorio page is loaded

        console.log(`Report generated successfully for session ${session.id}`);
      } catch (err) {
        console.error('Error generating report:', err);
        // Don't fail the webhook — return 200 so Stripe doesn't retry
        return NextResponse.json({
          received: true,
          warning: 'Report generation failed but payment was processed.',
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

function getInsuranceLabel(type: string): string {
  const labels: Record<string, string> = {
    auto: 'Seguro Auto',
    vida: 'Seguro de Vida',
    residencial: 'Seguro Residencial',
    viagem: 'Seguro Viagem',
  };
  return labels[type] || type;
}

async function sendReportEmail(
  email: string,
  pdfBuffer: Buffer,
  reportData: ReportData
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn('Resend not configured — skipping email delivery.');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Calcula Seguro <noreply@calculaseguro.com.br>',
      to: email,
      subject: `Seu Relatório Completo de ${reportData.insuranceTypeLabel} — Calcula Seguro`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0f766e; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🛡️ Calcula Seguro</h1>
          </div>
          <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0f172a;">Seu Relatório Premium está pronto!</h2>
            <p style="color: #475569; line-height: 1.6;">
              Obrigado por adquirir o Relatório Completo de <strong>${reportData.insuranceTypeLabel}</strong>.
            </p>
            <p style="color: #475569; line-height: 1.6;">
              Seu relatório em PDF está anexado a este email. Ele contém:
            </p>
            <ul style="color: #475569; line-height: 1.8;">
              <li>✅ Comparativo das 3 melhores cotações</li>
              <li>✅ Análise detalhada de cada seguradora</li>
              <li>✅ Recomendações personalizadas para seu perfil</li>
              <li>✅ Preços estimados atualizados</li>
            </ul>
            <p style="color: #475569; line-height: 1.6;">
              Para contratar, entre em contato com as seguradoras recomendadas no relatório.
            </p>
            <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Este é um email automático do Calcula Seguro. Relatório Premium — R$ 19,90.
                Em caso de dúvidas, responda este email.
              </p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `relatorio-${reportData.insuranceType}-calcula-seguro.pdf`,
          content: pdfBuffer.toString('base64'),
        },
      ],
    });
    console.log(`Report email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send email:', err);
    throw err;
  }
}
