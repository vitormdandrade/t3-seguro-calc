import { pdf } from '@react-pdf/renderer';
// @ts-ignore - Document props mismatch with React 19 is a known @react-pdf/renderer issue
import ReportPDF, { ReportData } from './ReportPDF';

export async function generateReportPdfBuffer(data: ReportData): Promise<Buffer> {
  // @ts-ignore - known React 19 / @react-pdf/renderer type mismatch
  const pdfInstance = pdf(ReportPDF({ data }));

  // Despite the name, toBuffer() returns a NodeJS.ReadableStream
  const stream: NodeJS.ReadableStream = await pdfInstance.toBuffer();
  const chunks: Buffer[] = [];

  return new Promise<Buffer>((resolve, reject) => {
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
