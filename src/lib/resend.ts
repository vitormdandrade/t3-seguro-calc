import { Resend } from 'resend';

const resendClient: Resend | null = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export function getResend(): Resend | null {
  return resendClient;
}
