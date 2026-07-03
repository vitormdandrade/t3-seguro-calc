import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register a font that supports Portuguese characters
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/Helvetica.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#1e293b',
  },
  header: {
    marginBottom: 24,
    borderBottom: '2px solid #0f766e',
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0f766e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0f172a',
    marginTop: 20,
    marginBottom: 10,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 4,
  },
  summaryBox: {
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    borderRadius: 6,
    padding: 14,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#475569',
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
    fontWeight: 700,
    fontSize: 10,
    color: '#0f172a',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #f1f5f9',
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
  },
  recommendationBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 6,
    padding: 14,
    marginTop: 16,
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#92400e',
    marginBottom: 6,
  },
  recommendationText: {
    fontSize: 10,
    color: '#78350f',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#94a3b8',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 8,
  },
  disclaimer: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 20,
    fontStyle: 'italic',
  },
  quoteBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quoteName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#0f172a',
  },
  quoteRating: {
    fontSize: 11,
    color: '#d97706',
    fontWeight: 700,
  },
  quotePrice: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f766e',
    marginBottom: 6,
  },
  quoteDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 9,
    color: '#64748b',
  },
  coverageBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 600,
  },
});

export interface QuoteInsurer {
  slug: string;
  name: string;
  rating: number;
  estimatedMonthly: number;
  highlights?: string[];
}

export interface ReportData {
  insuranceType: string;
  insuranceTypeLabel: string;
  userInputs: Record<string, string>;
  estimatedPrice: string;
  quotes: QuoteInsurer[];
  recommendations: string[];
  generatedAt: string;
}

const insuranceLabels: Record<string, string> = {
  auto: 'Seguro Auto',
  vida: 'Seguro de Vida',
  residencial: 'Seguro Residencial',
  viagem: 'Seguro Viagem',
};

function formatCurrency(value: number): string {
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

export default function ReportPDF({ data }: { data: ReportData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Relatório Completo de Cotação</Text>
          <Text style={styles.subtitle}>
            {insuranceLabels[data.insuranceType] || data.insuranceTypeLabel} • Gerado em {data.generatedAt}
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tipo de Seguro:</Text>
            <Text style={styles.summaryValue}>{insuranceLabels[data.insuranceType] || data.insuranceTypeLabel}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Preço Estimado:</Text>
            <Text style={styles.summaryValue}>{data.estimatedPrice}</Text>
          </View>
          {Object.entries(data.userInputs).map(([key, value]) => (
            <View style={styles.summaryRow} key={key}>
              <Text style={styles.summaryLabel}>{key}:</Text>
              <Text style={styles.summaryValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* 3 Real Quotes Comparison Table */}
        <Text style={styles.sectionTitle}>🏆 Comparativo das 3 Melhores Cotações</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Seguradora</Text>
            <Text style={styles.tableCell}>Avaliação</Text>
            <Text style={styles.tableCell}>Preço Mensal</Text>
            <Text style={styles.tableCell}>Destaques</Text>
          </View>
          {data.quotes.map((quote, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCell}>{quote.name}</Text>
              <Text style={styles.tableCell}>★ {quote.rating.toFixed(1)}</Text>
              <Text style={[styles.tableCell, { color: '#0f766e', fontWeight: 700 }]}>
                {formatCurrency(quote.estimatedMonthly)}
              </Text>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {quote.highlights?.slice(0, 2).join(', ') || 'Cobertura completa'}
              </Text>
            </View>
          ))}
        </View>

        {/* Detailed Quotes */}
        <Text style={styles.sectionTitle}>📋 Cotações Detalhadas</Text>
        {data.quotes.map((quote, idx) => (
          <View style={styles.quoteBox} key={idx}>
            <View style={styles.quoteHeader}>
              <Text style={styles.quoteName}>{idx + 1}. {quote.name}</Text>
              <Text style={styles.quoteRating}>★ {quote.rating.toFixed(1)} / 5.0</Text>
            </View>
            <Text style={styles.quotePrice}>
              Estimativa: {formatCurrency(quote.estimatedMonthly)}/mês
            </Text>
            <View style={styles.quoteDetails}>
              {(quote.highlights && quote.highlights.length > 0
                ? quote.highlights
                : ['Cobertura abrangente', 'Atendimento 24h', 'Sinistro rápido']
              ).map((h, i) => (
                <Text style={styles.coverageBadge} key={i}>{h}</Text>
              ))}
            </View>
          </View>
        ))}

        {/* Personalized Recommendations */}
        <Text style={styles.sectionTitle}>💡 Recomendações Personalizadas</Text>
        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationTitle}>
            Com base no seu perfil, recomendamos:
          </Text>
          {data.recommendations.map((rec, idx) => (
            <Text style={styles.recommendationText} key={idx}>
              • {rec}
            </Text>
          ))}
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Este relatório é uma simulação educacional baseada em dados de mercado. Os valores reais podem variar.
          Consulte um corretor de seguros para obter uma cotação oficial vinculante.
          Relatório gerado por Calcula Seguro (calculaseguro.com.br).
        </Text>

        {/* Footer */}
        <Text style={styles.footer}>
          Calcula Seguro © {new Date().getFullYear()} • calculaseguro.com.br • Relatório Premium R$ 19,90
        </Text>
      </Page>
    </Document>
  );
}
