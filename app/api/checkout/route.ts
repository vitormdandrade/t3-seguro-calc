import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

const PREMIUM_REPORT_PRICE_BRL = 1990; // R$ 19,90 in centavos

interface CheckoutRequestBody {
  insuranceType: string;
  email?: string;
  userInputs: Record<string, string>;
  estimatedPrice: string;
  quotes: Array<{
    slug: string;
    name: string;
    rating: number;
    estimatedMonthly: number;
    highlights?: string[];
  }>;
  recommendations: string[];
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe não configurado. Configure STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    const body: CheckoutRequestBody = await request.json();

    if (!body.insuranceType) {
      return NextResponse.json(
        { error: 'Tipo de seguro é obrigatório.' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: body.email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Relatório Completo de Cotação',
              description: `Relatório premium com 3 cotações reais de ${body.insuranceType} — PDF detalhado com comparativo e recomendações personalizadas.`,
              images: [],
            },
            unit_amount: PREMIUM_REPORT_PRICE_BRL,
          },
          quantity: 1,
        },
      ],
      metadata: {
        insuranceType: body.insuranceType,
        userInputs: JSON.stringify(body.userInputs),
        estimatedPrice: body.estimatedPrice,
        quotes: JSON.stringify(body.quotes),
        recommendations: JSON.stringify(body.recommendations),
        source: 'calculadora-upsell',
      },
      success_url: `${baseUrl}/relatorio/{CHECKOUT_SESSION_ID}?status=success`,
      cancel_url: `${baseUrl}/calculadora/seguro-${body.insuranceType}`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    console.error('Checkout API error:', err);
    return NextResponse.json(
      { error: 'Erro ao criar sessão de pagamento.' },
      { status: 500 }
    );
  }
}
