import Stripe from 'stripe';

const stripeClient: Stripe | null = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-06-24.dahlia',
      typescript: true,
    })
  : null;

export function getStripe(): Stripe | null {
  return stripeClient;
}
