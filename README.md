# SegoCalc - Programmatic SEO Insurance Calculator Site

A Next.js 14 App Router site built for ranking in Brazilian Portuguese-language insurance queries. Complete SEO-optimized insurance comparison platform targeting R$50-200 per lead affiliate monetization.

## Project Overview

- **Target Market**: Brazil (pt-BR) - largest insurance market in LatAm
- **Focus**: Insurance affiliate monetization via qualified leads
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Architecture**: Static generation + client-side calculators

## Data Layer Completed

### Insurers (22 companies)
Porto Seguro, Bradesco, SulAmérica, Allianz Brasil, Mapfre, Zurich Brasil, HDI Seguros, Liberty Seguros, Tokio Marine, Chubb Brasil, Itaú Seguros, BB Seguridade, Caixa Seguradora, Suhai, Youse, Pier, Tramppo, Sompo, Generali, AXA Brasil, Seguros Unimed, Mongeral Aegon

### Insurance Types (10 categories)
Auto, Moto, Vida, Residencial, Empresarial, Viagem, Saúde, Bike, Pet, Responsabilidade Civil

### Car Models (78 models, 2015-2026)
Including popular models (HB20, Gol, Onix, Argo, Tracker), luxury (BMW, Mercedes, Audi, Porsche, Ferrari), and Chinese brands (BYD, Geely, Chery)

### States (27 Brazilian states)
Risk multipliers for regional pricing variations (SP: 1.3x, PI: 0.7x)

## Pages Generated

### Calculators (4 interactive pages)
1. **Seguro Auto** - Car insurance with vehicle selection, state, driver age, garage
2. **Seguro Vida** - Life insurance with coverage amount and smoker status
3. **Seguro Residencial** - Home insurance with property type and value
4. **Seguro Viagem** - Travel insurance with destination and duration

### SEO Content Pages (90+ pages)
- Home page with feature overview
- Seguros index + 10 dynamic insurance type pages
- Seguradoras index + 22 dynamic insurer profile pages
- Guias index + guide article pages
- Estado pages for all 27 Brazilian states (state-specific auto insurance)
- XML sitemap for search engines

## Calculator Logic

All calculators implement real mathematical models:

### Auto Insurance
- Base price from car model (year/brand)
- State risk multiplier (0.7x to 1.3x)
- Age adjustment (young/senior drivers higher risk)
- Garage discount (15% reduction)
- Risk profile multiplier (high/medium/low)

### Life Insurance
- Base: 0.05% of coverage amount per month
- Age-based multiplier (increasing with age)
- Smoker surcharge (+50%)

### Home Insurance
- Base: 0.3% of property value annually
- Property type adjustment (house vs apartment)
- Ownership status (owned vs rented)
- State risk multiplier

### Travel Insurance
- Base: R$20/day
- Destination multiplier (1.0x-1.5x)
- Age adjustment (senior travelers +50%-100%)

## Affiliate Monetization

### Configuration
All insurer affiliate links configured in `src/config/affiliates.ts` with:
- Base URLs
- UTM tracking parameters
- Commission ranges (R$50-200 per lead)

### Lead Capture Flow
1. User completes calculator
2. Results show top 3 recommended insurers
3. "Receber Cotação Grátis" CTA button
4. Clicks lead to insurer via affiliate link
5. UTM tracking captures source/medium/campaign

## Technical Stack

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (mobile-first)
- **Data**: JSON files (no database needed)
- **Deployment**: Vercel-optimized

## File Structure

```
/
├── app/                          # Next.js pages
│   ├── page.tsx                 # Home
│   ├── layout.tsx               # Header/footer
│   ├── sitemap.ts               # XML sitemap
│   ├── calculadora/             # 4 calculator pages
│   ├── seguros/                 # 11 insurance type pages
│   ├── seguradoras/             # 23 insurer pages
│   ├── estado/                  # 27 state pages
│   └── guias/                   # Guide index
├── src/
│   ├── config/affiliates.ts     # Affiliate URLs + UTM
│   └── lib/calculators.ts       # Calculator math
├── data/                         # JSON data sources
│   ├── insurers.json            # 22 insurers
│   ├── insurance-types.json     # 10 types
│   ├── car-models.json          # 78 models
│   └── states.json              # 27 states
└── [config files]
```

## Setup & Deployment

```bash
# Install
npm install

# Dev
npm run dev           # http://localhost:3000

# Build
npm run build

# Start
npm start

# Lint
npm run lint
```

## Vercel Deployment

```bash
git push origin main    # Auto-deploys to Vercel
```

Configured in `vercel.json` with Next.js framework.

## Legal

Every calculator includes disclaimer:
"Valores estimados e não constituem proposta de seguro. Solicite uma cotação oficial gratuita."

## Build Status

All source files created:
- 13 app page files (home, calculators, content)
- 4 data files (insurers, types, cars, states)
- 2 core logic files (calculators, affiliates)
- Config files (next, vercel, env)

Project ready for `npm run build` and deployment to Vercel.

---

**Built for Project 1M Portfolio - Brazilian Insurance Market**
