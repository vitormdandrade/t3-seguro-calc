import { pdf } from '@react-pdf/renderer';
// @ts-ignore - Document props mismatch with React 19 is a known @react-pdf/renderer issue
import ComparativoPDF, { ComparativoData } from './ComparativoPDF';

export function buildComparativoData(): ComparativoData {
  return {
    generatedAt: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  };
}

export async function generateComparativoPdfBuffer(
  data: ComparativoData = buildComparativoData()
): Promise<Buffer> {
  // @ts-ignore - known React 19 / @react-pdf/renderer type mismatch
  const pdfInstance = pdf(ComparativoPDF({ data }));

  // Despite the name, toBuffer() returns a NodeJS.ReadableStream
  const stream: NodeJS.ReadableStream = await pdfInstance.toBuffer();
  const chunks: Buffer[] = [];

  return new Promise<Buffer>((resolve, reject) => {
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
