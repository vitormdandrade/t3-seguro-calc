import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import insuranceTypes from '../../../data/insurance-types.json';
import insurers from '../../../data/insurers.json';
import carModels from '../../../data/car-models.json';
import states from '../../../data/states.json';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 60,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1e293b',
  },
  // ── Cover ────────────────────────────────────────────────
  coverPage: {
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#1e293b',
    justifyContent: 'center',
  },
  coverBadge: {
    fontSize: 10,
    color: '#0f766e',
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: '#0f766e',
    marginBottom: 10,
    lineHeight: 1.2,
  },
  coverSubtitle: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 28,
    lineHeight: 1.4,
  },
  coverBox: {
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    borderRadius: 6,
    padding: 18,
    marginBottom: 28,
  },
  coverBoxTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
  },
  coverBoxItem: {
    fontSize: 11,
    color: '#334155',
    marginBottom: 5,
    lineHeight: 1.4,
  },
  coverMeta: {
    fontSize: 10,
    color: '#64748b',
  },
  // ── Content ──────────────────────────────────────────────
  header: {
    marginBottom: 18,
    borderBottom: '2px solid #0f766e',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f766e',
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#64748b',
  },
  sectionIntro: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
    marginTop: 14,
    marginBottom: 6,
  },
  table: {
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    padding: 6,
    borderRadius: 4,
    marginBottom: 3,
    fontWeight: 700,
    fontSize: 9,
    color: '#0f172a',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottom: '1px solid #f1f5f9',
    fontSize: 9,
  },
  cell1: { flex: 1 },
  cell2: { flex: 2 },
  cell3: { flex: 3 },
  cellSmall: { flex: 0.7 },
  cellPrice: { color: '#0f766e', fontWeight: 700 },
  tipBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#92400e',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 9.5,
    color: '#78350f',
    lineHeight: 1.5,
  },
  disclaimerBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 14,
    marginTop: 20,
  },
  disclaimerTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#475569',
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 8.5,
    color: '#64748b',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 26,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#94a3b8',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 6,
  },
});

export interface ComparativoData {
  generatedAt: string;
}

function formatFaixa(range: { min: number; max: number }): string {
  return `R$ ${range.min.toLocaleString('pt-BR')} – R$ ${range.max.toLocaleString('pt-BR')}/mês`;
}

const riskLabels: Record<string, string> = {
  low: 'Perfil de risco baixo',
  medium: 'Perfil de risco médio',
  high: 'Perfil de risco alto',
};

const riskDescriptions: Record<string, string> = {
  low: 'Modelos com menor índice de roubo e custo de reparo acessível — os prêmios mensais mais baratos do mercado.',
  medium: 'Modelos com procura moderada por criminosos ou peças mais caras — prêmios intermediários.',
  high: 'Modelos muito visados para roubo ou com reparo caro — prêmios acima da média nacional.',
};

const savingTips: Array<{ title: string; text: string }> = [
  {
    title: '1. Compare pelo menos 3 cotações antes de fechar',
    text: 'Para o mesmo perfil, a diferença de preço entre seguradoras pode passar de 40%. Peça cotações em pelo menos três companhias (ou use um corretor multimarcas) e compare cobertura por cobertura, não apenas o preço final.',
  },
  {
    title: '2. Ajuste a franquia ao seu bolso',
    text: 'Optar pela franquia majorada (mais alta) pode reduzir o prêmio em 10% a 30%. Vale a pena se você dirige pouco e tem reserva de emergência para cobrir a franquia em caso de sinistro.',
  },
  {
    title: '3. Instale rastreador ou dispositivo antifurto',
    text: 'Rastreadores homologados e bloqueadores reduzem o risco de perda total por roubo. Muitas seguradoras oferecem desconto de 5% a 15% no prêmio para veículos rastreados.',
  },
  {
    title: '4. Aproveite (e proteja) sua classe de bônus',
    text: 'Cada ano sem sinistro sobe sua classe de bônus e derruba o preço da renovação. Evite acionar o seguro para pequenos danos que custam pouco mais que a franquia — você pode perder o bônus e pagar mais caro nos anos seguintes.',
  },
  {
    title: '5. Pague à vista ou no débito anual',
    text: 'O parcelamento no cartão costuma embutir juros. O pagamento anual à vista (ou em menos parcelas no débito) costuma sair de 5% a 12% mais barato que 12 parcelas no cartão.',
  },
  {
    title: '6. Informe o perfil real — mas completo',
    text: 'Garagem em casa e no trabalho, baixa quilometragem mensal e ser o condutor principal são fatores que reduzem o preço. Preencha o questionário de avaliação de risco com atenção: cada resposta correta a seu favor vale desconto.',
  },
  {
    title: '7. Considere o seguro por assinatura ou de cobertura reduzida',
    text: 'Para carros com mais de 10 anos, o seguro compreensivo pode não compensar. Avalie coberturas só de roubo/furto e terceiros (RCF), ou seguradoras digitais com planos mensais — podem custar metade do seguro tradicional.',
  },
  {
    title: '8. Reavalie o valor da indenização e coberturas extras',
    text: 'Carro reserva por 30 dias, vidros ilimitados e outras coberturas adicionais encarecem a apólice. Contrate apenas o que você realmente usaria e verifique se a porcentagem da tabela FIPE contratada faz sentido.',
  },
  {
    title: '9. Agrupe apólices na mesma seguradora',
    text: 'Combinar seguro auto + residencial + vida na mesma companhia costuma render desconto de fidelidade de 5% a 10% em cada apólice, além de simplificar o atendimento.',
  },
  {
    title: '10. Renove com antecedência e negocie',
    text: 'Não deixe a renovação para o último dia. Cote no mercado 30 dias antes do vencimento e apresente a proposta concorrente à sua seguradora atual — a retenção de clientes costuma liberar descontos que não aparecem na primeira oferta.',
  },
];

const sortedInsurers = [...insurers].sort((a, b) => b.rating - a.rating);

const productLabels: Record<string, string> = {
  auto: 'Auto',
  moto: 'Moto',
  vida: 'Vida',
  residencial: 'Residencial',
  empresarial: 'Empresarial',
  viagem: 'Viagem',
  saude: 'Saúde',
  bike: 'Bike',
  pet: 'Pet',
  'responsabilidade-civil': 'Resp. Civil',
};

function ContentPage({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      {children}
      <Text style={styles.footer} fixed>
        Comparativo de Seguros 2026 • Calcula Seguro © {new Date().getFullYear()} • calculaseguro.com.br
      </Text>
    </Page>
  );
}

export default function ComparativoPDF({ data }: { data: ComparativoData }) {
  return (
    <Document
      title="Comparativo de Seguros 2026 — Calcula Seguro"
      author="Calcula Seguro"
      language="pt-BR"
    >
      {/* ── Capa ─────────────────────────────────────────── */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverBadge}>Calcula Seguro • Edição 2026</Text>
        <Text style={styles.coverTitle}>Comparativo de Seguros 2026</Text>
        <Text style={styles.coverSubtitle}>
          Guia de Preços e Seguradoras no Brasil — panorama completo de valores,
          rankings e índices regionais para contratar melhor e pagar menos.
        </Text>

        <View style={styles.coverBox}>
          <Text style={styles.coverBoxTitle}>O que você encontra neste guia</Text>
          <Text style={styles.coverBoxItem}>
            1. Panorama dos {insuranceTypes.length} principais tipos de seguro com faixas de preço típicas
          </Text>
          <Text style={styles.coverBoxItem}>
            2. Ranking de {insurers.length} seguradoras por avaliação, com produtos e destaques
          </Text>
          <Text style={styles.coverBoxItem}>
            3. Seguro auto por modelo: {carModels.length} veículos com prêmio médio mensal por perfil de risco
          </Text>
          <Text style={styles.coverBoxItem}>
            4. Variação de preço nos 27 estados brasileiros (auto, vida, residencial e viagem)
          </Text>
          <Text style={styles.coverBoxItem}>
            5. Como economizar: 10 recomendações práticas para reduzir o valor da sua apólice
          </Text>
        </View>

        <Text style={styles.coverMeta}>Documento gerado em {data.generatedAt}</Text>
        <Text style={[styles.coverMeta, { marginTop: 4 }]}>
          calculaseguro.com.br • Valores estimativos e informativos — não constituem cotação oficial.
        </Text>
      </Page>

      {/* ── Seção 1: Panorama ────────────────────────────── */}
      <ContentPage
        title="1. Panorama dos tipos de seguro"
        subtitle="Faixas de preço típicas no Brasil e obrigatoriedade legal"
      >
        <Text style={styles.sectionIntro}>
          A tabela abaixo resume os {insuranceTypes.length} principais tipos de seguro
          comercializados no Brasil, com a faixa de preço mensal tipicamente praticada
          pelo mercado, as coberturas mais comuns e se a contratação é exigida por lei.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell2}>Tipo de seguro</Text>
            <Text style={styles.cell2}>Faixa de preço típica</Text>
            <Text style={styles.cell3}>Principais coberturas</Text>
            <Text style={styles.cell1}>Obrigatório?</Text>
          </View>
          {insuranceTypes.map((type) => (
            <View style={styles.tableRow} key={type.slug} wrap={false}>
              <Text style={[styles.cell2, { fontWeight: 700 }]}>{type.name_pt}</Text>
              <Text style={[styles.cell2, styles.cellPrice]}>
                {formatFaixa(type.typical_price_range_brl)}
              </Text>
              <Text style={[styles.cell3, { color: '#64748b' }]}>
                {type.key_coverages.slice(0, 3).join(' • ')}
              </Text>
              <Text style={styles.cell1}>
                {type.required_by_law ? 'Sim' : 'Não'}
              </Text>
            </View>
          ))}
        </View>
        <Text style={[styles.sectionIntro, { marginTop: 10 }]}>
          Observação: os valores variam conforme perfil do contratante, região, capital
          segurado e coberturas escolhidas. Use a faixa como referência de ponto de
          partida na negociação.
        </Text>
      </ContentPage>

      {/* ── Seção 2: Ranking de seguradoras ──────────────── */}
      <ContentPage
        title="2. Ranking de seguradoras"
        subtitle={`${insurers.length} seguradoras ordenadas por avaliação dos consumidores`}
      >
        <Text style={styles.sectionIntro}>
          Ranking das seguradoras que atuam no Brasil, ordenado pela avaliação média
          dos consumidores (escala de 0 a 5). Além da nota, considere sempre a solidez
          da companhia, a rede de assistência e a agilidade no pagamento de sinistros.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cellSmall}>Pos.</Text>
            <Text style={styles.cell2}>Seguradora</Text>
            <Text style={styles.cellSmall}>Nota</Text>
            <Text style={styles.cell2}>Produtos</Text>
            <Text style={styles.cell3}>Destaque</Text>
          </View>
          {sortedInsurers.map((insurer, idx) => (
            <View style={styles.tableRow} key={insurer.slug} wrap={false}>
              <Text style={styles.cellSmall}>{idx + 1}º</Text>
              <Text style={[styles.cell2, { fontWeight: 700 }]}>
                {insurer.name}
              </Text>
              <Text style={[styles.cellSmall, { color: '#d97706', fontWeight: 700 }]}>
                {insurer.rating.toFixed(1)}
              </Text>
              <Text style={[styles.cell2, { color: '#64748b' }]}>
                {insurer.products.map((p) => productLabels[p] || p).join(', ')}
              </Text>
              <Text style={[styles.cell3, { color: '#64748b' }]}>
                {insurer.highlights[0] || '—'}
              </Text>
            </View>
          ))}
        </View>
      </ContentPage>

      {/* ── Seção 3: Seguro auto por modelo ──────────────── */}
      <ContentPage
        title="3. Seguro auto por modelo de veículo"
        subtitle={`Prêmio médio mensal estimado para ${carModels.length} modelos, agrupados por perfil de risco`}
      >
        <Text style={styles.sectionIntro}>
          O modelo do veículo é um dos fatores que mais pesam no preço do seguro auto:
          índice de roubo, custo das peças e valor de mercado definem o perfil de risco.
          Os valores abaixo são médias nacionais estimadas — em estados com índice
          elevado (veja a Seção 4), multiplique pelo fator regional.
        </Text>
        {(['low', 'medium', 'high'] as const).map((risk) => {
          const models = carModels
            .filter((c) => c.risk_profile === risk)
            .sort((a, b) => a.avg_monthly_insurance_brl - b.avg_monthly_insurance_brl);
          if (models.length === 0) return null;
          return (
            <View key={risk}>
              <Text style={styles.groupTitle}>
                {riskLabels[risk]} ({models.length} modelos)
              </Text>
              <Text style={styles.sectionIntro}>{riskDescriptions[risk]}</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.cell2}>Marca</Text>
                  <Text style={styles.cell2}>Modelo</Text>
                  <Text style={styles.cell2}>Anos de fabricação</Text>
                  <Text style={styles.cell2}>Média mensal</Text>
                </View>
                {models.map((car) => (
                  <View
                    style={styles.tableRow}
                    key={`${car.brand}-${car.model}-${car.year_from}`}
                    wrap={false}
                  >
                    <Text style={styles.cell2}>{car.brand}</Text>
                    <Text style={[styles.cell2, { fontWeight: 700 }]}>{car.model}</Text>
                    <Text style={[styles.cell2, { color: '#64748b' }]}>
                      {car.year_from}–{car.year_to}
                    </Text>
                    <Text style={[styles.cell2, styles.cellPrice]}>
                      R$ {car.avg_monthly_insurance_brl.toLocaleString('pt-BR')}/mês
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ContentPage>

      {/* ── Seção 4: Variação por estado ─────────────────── */}
      <ContentPage
        title="4. Variação de preço por estado"
        subtitle="Índices regionais sobre a média nacional (1,00 = média do Brasil)"
      >
        <Text style={styles.sectionIntro}>
          O mesmo seguro pode custar bem mais (ou menos) dependendo do estado. Os
          índices abaixo mostram quanto cada região fica acima ou abaixo da média
          nacional: um índice de 1,30 significa preço cerca de 30% mais caro; 0,85
          significa 15% mais barato.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cellSmall}>UF</Text>
            <Text style={styles.cell2}>Estado</Text>
            <Text style={styles.cellSmall}>Auto</Text>
            <Text style={styles.cellSmall}>Vida</Text>
            <Text style={styles.cellSmall}>Resid.</Text>
            <Text style={styles.cellSmall}>Viagem</Text>
            <Text style={styles.cell3}>Observação</Text>
          </View>
          {states.map((state) => (
            <View style={styles.tableRow} key={state.uf} wrap={false}>
              <Text style={[styles.cellSmall, { fontWeight: 700 }]}>{state.uf}</Text>
              <Text style={styles.cell2}>{state.name}</Text>
              <Text style={styles.cellSmall}>
                {state.auto_index.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={styles.cellSmall}>
                {state.vida_index.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={styles.cellSmall}>
                {state.residencial_index.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={styles.cellSmall}>
                {state.viagem_index.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={[styles.cell3, { fontSize: 7.5, color: '#64748b' }]}>
                {state.risk_note}
              </Text>
            </View>
          ))}
        </View>
      </ContentPage>

      {/* ── Seção 5: Como economizar ─────────────────────── */}
      <ContentPage
        title="5. Como economizar no seu seguro"
        subtitle="10 recomendações práticas para reduzir o valor da apólice"
      >
        <Text style={styles.sectionIntro}>
          Pequenos ajustes na contratação podem reduzir o preço final em 20% a 40% sem
          abrir mão da proteção essencial. Aplique as recomendações abaixo na próxima
          cotação ou renovação.
        </Text>
        {savingTips.map((tip) => (
          <View style={styles.tipBox} key={tip.title} wrap={false}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipText}>{tip.text}</Text>
          </View>
        ))}

        <View style={styles.disclaimerBox} wrap={false}>
          <Text style={styles.disclaimerTitle}>Aviso importante</Text>
          <Text style={styles.disclaimerText}>
            Os valores, índices e rankings apresentados neste documento são estimativas
            informativas baseadas em dados de mercado, com finalidade exclusivamente
            educacional. Eles não constituem cotação oficial, oferta ou recomendação de
            contratação, e os preços reais podem variar conforme o perfil do contratante,
            a seguradora e as condições vigentes. Antes de contratar qualquer seguro,
            consulte um corretor licenciado pela SUSEP (Superintendência de Seguros
            Privados) e leia atentamente as condições gerais da apólice. Documento
            produzido por Calcula Seguro (calculaseguro.com.br), gerado em {data.generatedAt}.
          </Text>
        </View>
      </ContentPage>
    </Document>
  );
}
