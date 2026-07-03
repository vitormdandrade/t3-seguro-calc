# Google Ads Campaign Setup Guide — Calcula Seguro

> **Status:** All assets prepared. Actual Google Ads account configuration must be done manually in the Google Ads dashboard.
> **Landing page:** `https://calculaseguro.com.br/lp/seguro-auto`

---

## 1. Prerequisites

- [ ] Google Ads account created at [ads.google.com](https://ads.google.com)
- [ ] Billing method configured (cartão de crédito internacional ou boleto)
- [ ] Google Tag Manager account (optional, for advanced tracking) or direct gtag.js snippet
- [ ] Conversion tracking pixel installed (see Section 3)

---

## 2. Campaign Structure

### Campaign Type
**Search** (Rede de Pesquisa) — only search network, not Display/partners initially.

### Campaign Settings

| Setting | Value |
|---------|-------|
| Campaign type | Search |
| Networks | Search Network only (uncheck Display Network and Search Partners for testing) |
| Locations | Brazil → Target by state (see geo-targeting below) |
| Languages | Portuguese (pt-BR) |
| Budget | R$ 30,00 / dia |
| Bidding strategy | Maximize conversions (or Maximize clicks for the first 2 weeks while gathering data) |
| Bid limit (if manual CPC) | R$ 1,50 max CPC |
| Ad schedule | Seg-Sex 06:00–23:00, Sáb-Dom 08:00–20:00 |
| Ad rotation | Optimize for clicks/conversions |

### Geo-Targeting Strategy

**Phase 1 (Week 1-2):** Target SP capital + Grande SP only (highest search volume, highest competition).
**Phase 2 (Week 3-4):** Expand to RJ + MG state capitals.
**Phase 3 (Week 5+):** Expand to all 27 state capitals using "presence or interest".

Target all 27 Brazilian state capitals individually as location targets:
SP, RJ, MG, BA, RS, PR, PE, CE, PA, MA, SC, GO, PB, RN, ES, AM, MT, AL, PI, DF, MS, SE, RO, TO, AC, AP, RR

---

## 3. Conversion Tracking

### Install the gtag.js Snippet

The landing page layout at `app/lp/layout.tsx` already includes a gtag.js snippet placeholder. Update the following values:

1. Replace `AW-REPLACE_WITH_CONVERSION_ID` with your actual Google Ads conversion ID
2. Replace `REPLACE_WITH_CONVERSION_LABEL` in the LP page's `gtag('event', 'conversion', ...)` call

### How to get your Conversion ID and Label

1. In Google Ads → Tools & Settings → Measurement → Conversions
2. Click "+ New conversion action" → Website
3. Select "Lead" as the conversion category
4. Name: "Lead Form Submit — LP Seguro Auto"
5. Value: R$ 5,00 (estimated value per lead — adjust based on actual data)
6. Count: Every conversion
7. Click-through conversion window: 30 days
8. View-through conversion window: 1 day
9. Attribution model: Data-driven

After creating the conversion action, you'll get:
- **Conversion ID**: `AW-XXXXXXXXX`
- **Conversion Label**: `XXXXXXXXXXXXXXX`

### Files to Update

1. `app/lp/layout.tsx` — line with `src="https://www.googletagmanager.com/gtag/js?id=AW-REPLACE_WITH_CONVERSION_ID"`
2. `app/lp/layout.tsx` — line with `gtag('config', 'AW-REPLACE_WITH_CONVERSION_ID')`
3. `app/lp/seguro-auto/page.tsx` — line with `send_to: 'AW-REPLACE_WITH_CONVERSION_ID/REPLACE_WITH_CONVERSION_LABEL'`

### UTM Tracking

The landing page already captures `utm_source`, `utm_medium`, `utm_campaign`, and `utm_term` from URL params. These are stored in the Supabase `leads` table (run `migrations/add_utm_fields.sql` first).

Google Ads auto-tagging appends `gclid` to URLs when enabled. To auto-capture gclid:
1. In Google Ads → Settings → Account Settings → Auto-tagging: **Enable**
2. The `gclid` column in the leads table will capture this if sent by the client (see `migrations/add_utm_fields.sql`)

**Tip:** Use UTM parameters in your final URLs for manual tracking:
```
https://calculaseguro.com.br/lp/seguro-auto?utm_source=google&utm_medium=cpc&utm_campaign=seguro_auto_sp&utm_term=cotacao_seguro_auto_sp
```

---

## 4. Keyword Strategy

### Campaign 1: Seguro Auto — Capitais (Exact + Phrase Match)

**Ad Group: São Paulo**

| Keyword | Match Type | Est. Monthly Searches | Suggested Max CPC |
|---------|-----------|----------------------|-------------------|
| cotação seguro auto SP | Phrase | 1,000+ | R$ 1,50 |
| seguro carro SP barato | Phrase | 500+ | R$ 1,20 |
| seguro auto online | Broad | 3,000+ | R$ 1,00 |
| cotar seguro carro | Exact | 500+ | R$ 1,30 |
| seguro auto mais barato SP | Phrase | 400+ | R$ 1,40 |
| simulador seguro auto | Broad | 2,000+ | R$ 0,80 |
| preço seguro carro SP | Phrase | 300+ | R$ 1,20 |

**Ad Group: Rio de Janeiro**

| Keyword | Match Type | Est. Monthly Searches |
|---------|-----------|----------------------|
| cotação seguro auto RJ | Phrase | 800+ |
| seguro carro RJ barato | Phrase | 400+ |
| seguro auto RJ online | Phrase | 300+ |
| cotar seguro automóvel Rio | Exact | 200+ |

**Ad Groups for all 27 state capitals** — repeat the pattern with `[keyword] [UF]` or `[keyword] [capital name]`:

- **Belo Horizonte / MG:** "cotação seguro auto BH", "seguro carro MG barato"
- **Salvador / BA:** "cotação seguro auto Salvador", "seguro carro Bahia barato"
- **Brasília / DF:** "cotação seguro auto DF", "seguro carro Brasília barato"
- **Curitiba / PR:** "cotação seguro auto Curitiba", "seguro carro PR barato"
- **Porto Alegre / RS:** "cotação seguro auto Porto Alegre", "seguro carro RS barato"
- **Recife / PE:** "cotação seguro auto Recife", "seguro carro PE barato"
- **Fortaleza / CE:** "cotação seguro auto Fortaleza", "seguro carro CE barato"
- **Manaus / AM:** "cotação seguro auto Manaus", "seguro carro AM barato"
- **Belém / PA:** "cotação seguro auto Belém", "seguro carro PA barato"
- **Goiânia / GO:** "cotação seguro auto Goiânia", "seguro carro GO barato"
- **São Luís / MA:** "cotação seguro auto São Luís", "seguro carro MA barato"
- **Maceió / AL:** "cotação seguro auto Maceió", "seguro carro AL barato"
- **Natal / RN:** "cotação seguro auto Natal", "seguro carro RN barato"
- **João Pessoa / PB:** "cotação seguro auto João Pessoa", "seguro carro PB barato"
- **Teresina / PI:** "cotação seguro auto Teresina", "seguro carro PI barato"
- **Campo Grande / MS:** "cotação seguro auto Campo Grande", "seguro carro MS barato"
- **Aracaju / SE:** "cotação seguro auto Aracaju", "seguro carro SE barato"
- **Cuiabá / MT:** "cotação seguro auto Cuiabá", "seguro carro MT barato"
- **Florianópolis / SC:** "cotação seguro auto Florianópolis", "seguro carro SC barato"
- **Vitória / ES:** "cotação seguro auto Vitória", "seguro carro ES barato"
- **Porto Velho / RO:** "cotação seguro auto Porto Velho", "seguro carro RO barato"
- **Palmas / TO:** "cotação seguro auto Palmas", "seguro carro TO barato"
- **Rio Branco / AC:** "cotação seguro auto Rio Branco", "seguro carro AC barato"
- **Macapá / AP:** "cotação seguro auto Macapá", "seguro carro AP barato"
- **Boa Vista / RR:** "cotação seguro auto Boa Vista", "seguro carro RR barato"

### Negative Keywords (add at campaign level)

```
grátis, gratuito, sem pagar, como fazer, o que é, significado,
definição, wikipedia, pdf, download, curso, emprego, salário,
dolar, dívida, sinistro, reclamação, processo, judicial
```

---

## 5. Ad Copy

### Ad 1 — São Paulo (Top Keyword: "cotação seguro auto SP")

**Headlines:**
1. Cotação Seguro Auto SP (R$ 30/mês) — {Keyword:cotacao seguro auto sp}
2. Compare +10 Seguradoras Grátis
3. Seguro Auto SP — Cotações em 30s

**Descriptions:**
1. Preencha os dados do veículo e receba até 3 cotações de seguro auto em SP. Rápido e sem compromisso. Compare agora!
2. +10 seguradoras parceiras em SP. Porto Seguro, Bradesco, Youse e mais. Cote grátis e economize até 40% no seguro auto.

**Final URL:** `https://calculaseguro.com.br/lp/seguro-auto?utm_source=google&utm_medium=cpc&utm_campaign=seguro_auto_sp&utm_term=cotacao_seguro_auto_sp`

### Ad 2 — Rio de Janeiro (Top Keyword: "seguro carro RJ barato")

**Headlines:**
1. Seguro Carro RJ Barato — Cote Grátis — {Keyword:seguro carro rj barato}
2. Até 3 Cotações em 30 Segundos
3. Economize R$ 400/ano no Seguro

**Descriptions:**
1. Compare preços de seguro auto no Rio de Janeiro. +10 seguradoras parceiras. Preencha os dados e receba cotações em minutos.
2. Seguro auto RJ a partir de R$ 89/mês. Cote grátis com corretores verificados. Seus dados protegidos. Clique e compare!

**Final URL:** `https://calculaseguro.com.br/lp/seguro-auto?utm_source=google&utm_medium=cpc&utm_campaign=seguro_auto_rj&utm_term=seguro_carro_rj_barato`

### Ad 3 — National (Top Keyword: "seguro auto online")

**Headlines:**
1. Seguro Auto Online — Cotação Grátis — {Keyword:seguro auto online}
2. Compare +10 Seguradoras em 30s
3. Descubra o Melhor Preço Hoje

**Descriptions:**
1. Cotação de seguro auto online e grátis. Preencha os dados do veículo e receba orçamentos de 3 corretores parceiros. Sem compromisso.
2. +10 seguradoras verificadas: Porto Seguro, Bradesco, Youse e mais. Compare preços e economize. Clique e faça sua cotação agora!

**Final URL:** `https://calculaseguro.com.br/lp/seguro-auto?utm_source=google&utm_medium=cpc&utm_campaign=seguro_auto_nacional&utm_term=seguro_auto_online`

### Ad Copy Best Practices (Brazilian Market)

- Use numbers: "30 segundos", "3 cotações", "+10 seguradoras", "R$ 89/mês"
- Include the state/city in headlines when geo-targeting
- Use action verbs: "Cote", "Compare", "Economize", "Receba"
- Mention "grátis" and "sem compromisso" — critical for Brazilian users
- Use keyword insertion `{Keyword:fallback}` in at least one headline
- Add trust signals: "corretores verificados", "dados protegidos"

---

## 6. Launch Checklist

### Before Going Live

- [ ] Conversion tracking pixel verified (use Google Tag Assistant Chrome extension)
- [ ] Landing page loads in < 2 seconds (test on 3G with Chrome DevTools)
- [ ] UTM parameters flowing correctly to Supabase (submit a test lead)
- [ ] Form validation works (required fields, email format, phone format)
- [ ] Mobile layout is perfect (test on iPhone SE, Galaxy S22, + desktop)
- [ ] No broken links or console errors on the page
- [ ] Budget set to R$ 30/dia with a R$ 300 monthly cap
- [ ] Payment method verified in Google Ads
- [ ] Ad scheduling set (business hours focus)
- [ ] Negative keywords added
- [ ] All 27 state capital geo-targets configured

### After Launch — First 48 Hours

- [ ] Monitor impression share (target > 60% for top keywords)
- [ ] Check CTR (target > 3% for search ads)
- [ ] Verify conversions are firing (check Google Ads → Conversions)
- [ ] Check lead quality in Supabase (are names/phones real?)
- [ ] Pause any keywords with > R$ 3,00 CPC and 0 conversions

### Week 1 Optimization

- [ ] Add negative keywords from search terms report (irrelevant queries)
- [ ] Pause keywords with low CTR (< 1%) 
- [ ] Increase bids on keywords with > 5% CTR and conversions
- [ ] Create ad variations (test different CTAs: "Cote Grátis" vs "Compare Preços")
- [ ] Set up automated rules: pause keywords with > R$ 50 spend and 0 conversions

---

## 7. Budget Projection (R$ 30/dia)

| Metric | Conservative | Expected | Optimistic |
|--------|-------------|----------|------------|
| Daily clicks | 20 | 30 | 45 |
| Avg. CPC | R$ 1,50 | R$ 1,00 | R$ 0,67 |
| Conversion rate | 5% | 8% | 12% |
| Daily leads | 1 | 2.4 | 5.4 |
| **Monthly leads** | **30** | **72** | **162** |
| Monthly spend | R$ 900 | R$ 900 | R$ 900 |
| Cost per lead | R$ 30 | R$ 12,50 | R$ 5,55 |

---

## 8. Scaling Strategy

Once R$ 30/dia delivers consistent ROI:

1. **Increase budget by 20% every week** while CPA stays below target
2. **Add Display Remarketing** — target users who visited the LP but didn't convert
3. **Add YouTube Bumper Ads** — 6-second awareness ads targeting in-market "auto insurance" audience
4. **Create state-specific landing pages** — e.g., `/lp/seguro-auto-sp`, `/lp/seguro-auto-rj` with localized content
5. **Test Performance Max campaigns** — Google's AI-driven multi-channel campaigns

---

## 9. Tracking & Reporting

### Google Ads Dashboard (KPIs to track)
- Impressions → Clicks → CTR → CPC → Conversions → CPA → Conv. Rate

### Supabase Leads Dashboard
- Access at `https://calculaseguro.com.br/admin/leads` (protected)
- Query by `utm_campaign`, `utm_source` to see Google Ads lead quality
- Filter by `lead_type = 'auto'` for insurance auto leads only

### Monthly Report Template  
- **Campaign:** Google Ads — Seguro Auto
- **Period:** Mês/Ano
- **Spend:** R$ X
- **Impressions:** X
- **Clicks:** X
- **CTR:** X%
- **Avg CPC:** R$ X
- **Conversions (Leads):** X
- **CPA:** R$ X
- **Leads by state:** SP: X, RJ: X, MG: X, ...
- **Top performing keywords:** ...
- **Recommended actions:** ...

---

*Prepared by Consistency Labs — July 2026*
*For support, contact the development team or submit issues in the repo.*
