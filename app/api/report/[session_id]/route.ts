import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { generateReportPdfBuffer } from '@/lib/pdf/generateReportPdf';
import { ReportData, QuoteInsurer } from '@/lib/pdf/ReportPDF';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ session_id: string }> }
) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe não configurado.' },
        { status: 500 }
      );
    }

    const { session_id } = await params;

    if (!session_id) {
      return NextResponse.json(
        { error: 'ID da sessão é obrigatório.' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Pagamento não confirmado ou sessão inválida.' },
        { status: 404 }
      );
    }

    const metadata = session.metadata || {};

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
      }),
    };

    // Generate PDF
    const pdfBuffer = await generateReportPdfBuffer(reportData);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="relatorio-${reportData.insuranceType}-calcula-seguro.pdf"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    console.error('Report generation error:', err);
    return NextResponse.json(
      { error: 'Erro ao gerar o relatório.' },
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
