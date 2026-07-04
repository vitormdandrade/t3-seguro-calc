import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

const PREMIUM_REPORT_PRICE_BRL = 1990; // R$ 19,90 in centavos
const COMPARATIVO_2026_PRICE_BRL = 1490; // R$ 14,90 in centavos

interface CheckoutRequestBody {
  product?: string;
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

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // ── Produto: Comparativo de Seguros 2026 (pagamento único, sem inputs) ──
    if (body.product === 'comparativo-2026') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: body.email || undefined,
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: 'Comparativo de Seguros 2026',
                description:
                  'Guia de Preços e Seguradoras no Brasil — PDF com panorama de preços, ranking de seguradoras, seguro auto por modelo, índices por estado e dicas de economia.',
                images: [],
              },
              unit_amount: COMPARATIVO_2026_PRICE_BRL,
            },
            quantity: 1,
          },
        ],
        metadata: {
          product: 'comparativo-2026',
          source: 'comparativo-lp',
        },
        success_url: `${baseUrl}/relatorio/{CHECKOUT_SESSION_ID}?status=success`,
        cancel_url: `${baseUrl}/comparativo-2026`,
      });

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        url: session.url,
      });
    }

    if (!body.insuranceType) {
      return NextResponse.json(
        { error: 'Tipo de seguro é obrigatório.' },
        { status: 400 }
      );
    }

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
