import carModels from "../../data/car-models.json";
import states from "../../data/states.json";
import insurers from "../../data/insurers.json";

export interface HealthInsuranceInput {
  age: number;
  coverageType: "enfermaria" | "apartamento";
  region: "capital" | "interior";
  dependents: number;
  coverageAmount: number; // Desired annual coverage in BRL (e.g., 50000, 100000, 200000)
}

export interface HealthInsuranceResult {
  monthlyMin: number;
  monthlyTypical: number;
  monthlyPremium: number;
  coverageType: string;
  region: string;
  riskTier: string;
  ageRange: string;
  topInsurers: Array<{
    slug: string;
    name: string;
    estimatedMonthly: number;
    rating: number;
  }>;
}

export function calculateHealthInsurance(
  input: HealthInsuranceInput
): HealthInsuranceResult {
  // Base prices by coverage type (monthly, per person — Brazilian market avg 2025)
  const coverageBase: Record<string, number> = {
    enfermaria: 420,   // Quarto compartilhado
    apartamento: 600,  // Quarto privativo (~43% premium over enfermaria)
  };

  let basePrice = coverageBase[input.coverageType] || 420;

  // Age multiplier — follows ANS faixas etárias (10 bands)
  let ageMultiplier = 1.0;
  let ageRange = "18-23 anos";
  if (input.age < 18) { ageMultiplier = 0.7; ageRange = "0-17 anos"; }
  else if (input.age <= 23) { ageMultiplier = 0.8; ageRange = "18-23 anos"; }
  else if (input.age <= 33) { ageMultiplier = 1.0; ageRange = "24-33 anos"; }
  else if (input.age <= 43) { ageMultiplier = 1.3; ageRange = "34-43 anos"; }
  else if (input.age <= 48) { ageMultiplier = 1.6; ageRange = "44-48 anos"; }
  else if (input.age <= 53) { ageMultiplier = 2.0; ageRange = "49-53 anos"; }
  else if (input.age <= 58) { ageMultiplier = 2.5; ageRange = "54-58 anos"; }
  else if (input.age <= 65) { ageMultiplier = 3.2; ageRange = "59-65 anos"; }
  else { ageMultiplier = 3.8; ageRange = "66+ anos"; }

  basePrice *= ageMultiplier;

  // Dependents multiplier (each dependent adds ~80% of the base cost)
  const dependentsMultiplier = 1 + input.dependents * 0.8;
  basePrice *= dependentsMultiplier;

  // Region multiplier — capitals have higher medical costs
  const regionMultiplier = input.region === "capital" ? 1.15 : 0.85;
  basePrice *= regionMultiplier;

  // Coverage amount scaling — higher coverage tiers cost more
  // Base coverage amount is R$100,000/year; scale proportionally
  const coverageScale = Math.sqrt(input.coverageAmount / 100000);
  basePrice *= coverageScale;

  const monthlyMin = Math.round(basePrice * 0.72);
  const monthlyTypical = Math.round(basePrice);
  const monthlyPremium = Math.round(basePrice * 1.30);

  // Risk tier
  let riskTier = "baixo";
  if (monthlyTypical > 2000) riskTier = "alto";
  else if (monthlyTypical > 1000) riskTier = "médio";
  else riskTier = "baixo";

  const coverageLabels: Record<string, string> = {
    enfermaria: "Enfermaria (quarto compartilhado)",
    apartamento: "Apartamento (quarto privativo)",
  };

  const regionLabels: Record<string, string> = {
    capital: "Capital / Região Metropolitana",
    interior: "Interior",
  };

  const topInsurers = insurers
    .filter((i) => i.products.includes("saude"))
    .slice(0, 4)
    .map((i) => ({
      slug: i.slug,
      name: i.name,
      estimatedMonthly: Math.round(
        monthlyTypical * (i.rating / 4.5)
      ),
      rating: i.rating,
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    monthlyMin,
    monthlyTypical,
    monthlyPremium,
    coverageType: coverageLabels[input.coverageType],
    region: regionLabels[input.region],
    riskTier,
    ageRange,
    topInsurers,
  };
}

export interface AutoInsuranceInput {
  brand: string;
  model: string;
  year: number;
  state: string;
  driverAge: number;
  hasGarage: boolean;
}

export interface AutoInsuranceResult {
  monthlyMin: number;
  monthlyMax: number;
  riskProfile: string;
  topInsurers: Array<{
    slug: string;
    name: string;
    estimatedMonthly: number;
    rating: number;
  }>;
}

export function calculateAutoInsurance(
  input: AutoInsuranceInput
): AutoInsuranceResult {
  // Find car model
  const carModel = carModels.find(
    (c) =>
      c.brand.toLowerCase() === input.brand.toLowerCase() &&
      c.model.toLowerCase() === input.model.toLowerCase() &&
      c.year_from <= input.year &&
      c.year_to >= input.year
  );

  if (!carModel) {
    return {
      monthlyMin: 150,
      monthlyMax: 300,
      riskProfile: "unknown",
      topInsurers: [],
    };
  }

  // Find state multiplier
  const state = states.find((s) => s.uf === input.state);
  const stateMultiplier = state?.auto_index || 1.0;

  // Base insurance from car model
  let baseInsurance = carModel.avg_monthly_insurance_brl;

  // Apply state multiplier
  baseInsurance *= stateMultiplier;

  // Age adjustment (younger drivers pay more)
  let ageMultiplier = 1.0;
  if (input.driverAge < 25) {
    ageMultiplier = 1.3;
  } else if (input.driverAge < 30) {
    ageMultiplier = 1.15;
  } else if (input.driverAge > 65) {
    ageMultiplier = 1.15;
  }

  baseInsurance *= ageMultiplier;

  // Garage discount
  const garageDiscount = input.hasGarage ? 0.85 : 1.0;
  baseInsurance *= garageDiscount;

  // Risk profile adjustments
  const riskMultiplier =
    carModel.risk_profile === "high"
      ? 1.3
      : carModel.risk_profile === "medium"
        ? 1.1
        : 1.0;
  baseInsurance *= riskMultiplier;

  const monthlyMin = Math.round(baseInsurance * 0.85);
  const monthlyMax = Math.round(baseInsurance * 1.15);

  // Get top insurers for this risk profile
  const topInsurers = insurers
    .filter((i) => i.products.includes("auto"))
    .slice(0, 3)
    .map((i) => ({
      slug: i.slug,
      name: i.name,
      estimatedMonthly: Math.round(
        (monthlyMin + monthlyMax) / 2 * (i.rating / 4.5)
      ),
      rating: i.rating,
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    monthlyMin,
    monthlyMax,
    riskProfile: carModel.risk_profile,
    topInsurers,
  };
}

export interface LifeInsuranceInput {
  age: number;
  coverageAmount: number; // in BRL
  isSmoker: boolean;
}

export interface LifeInsuranceResult {
  monthlyEstimate: number;
  coverageAmount: number;
  topInsurers: Array<{
    slug: string;
    name: string;
    estimatedMonthly: number;
    rating: number;
  }>;
}

export function calculateLifeInsurance(
  input: LifeInsuranceInput
): LifeInsuranceResult {
  // Simplified mortality-based calculation
  // Base: 0.05% of coverage amount per year as premium
  let baseMonthlyRate = (input.coverageAmount * 0.0005) / 12;

  // Age multiplier (simplified mortality table)
  let ageMultiplier = 1.0;
  if (input.age < 25) {
    ageMultiplier = 0.5;
  } else if (input.age < 35) {
    ageMultiplier = 0.7;
  } else if (input.age < 45) {
    ageMultiplier = 1.0;
  } else if (input.age < 55) {
    ageMultiplier = 1.5;
  } else if (input.age < 65) {
    ageMultiplier = 2.5;
  } else {
    ageMultiplier = 4.0;
  }

  baseMonthlyRate *= ageMultiplier;

  // Smoker surcharge
  const smokerMultiplier = input.isSmoker ? 1.5 : 1.0;
  baseMonthlyRate *= smokerMultiplier;

  const monthlyEstimate = Math.round(baseMonthlyRate);

  const topInsurers = insurers
    .filter((i) => i.products.includes("vida"))
    .slice(0, 3)
    .map((i) => ({
      slug: i.slug,
      name: i.name,
      estimatedMonthly: Math.round(monthlyEstimate * (i.rating / 4.5)),
      rating: i.rating,
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    monthlyEstimate,
    coverageAmount: input.coverageAmount,
    topInsurers,
  };
}

export interface HomeInsuranceInput {
  propertyType: "house" | "apt";
  ownership: "owned" | "rented";
  state: string;
  propertyValue: number;
}

export interface HomeInsuranceResult {
  basicMonthly: number;
  comprehensiveMonthly: number;
  topInsurers: Array<{
    slug: string;
    name: string;
    estimatedMonthly: number;
    rating: number;
  }>;
}

export function calculateHomeInsurance(
  input: HomeInsuranceInput
): HomeInsuranceResult {
  // Base premium: ~0.3% of property value annually
  let baseAnnual = input.propertyValue * 0.003;

  // Property type adjustment
  const typeMultiplier =
    input.propertyType === "house" ? 1.0 : 0.8; // apts are lower risk
  baseAnnual *= typeMultiplier;

  // Ownership discount (renters may not get full discount)
  const ownershipMultiplier = input.ownership === "owned" ? 1.0 : 0.6;
  baseAnnual *= ownershipMultiplier;

  // State risk index
  const state = states.find((s) => s.uf === input.state);
  const stateMultiplier = state?.auto_index || 1.0;
  baseAnnual *= stateMultiplier;

  const basicMonthly = Math.round((baseAnnual / 12) * 0.7); // 70% of comprehensive
  const comprehensiveMonthly = Math.round(baseAnnual / 12);

  const topInsurers = insurers
    .filter((i) => i.products.includes("residencial"))
    .slice(0, 3)
    .map((i) => ({
      slug: i.slug,
      name: i.name,
      estimatedMonthly: Math.round(comprehensiveMonthly * (i.rating / 4.5)),
      rating: i.rating,
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    basicMonthly,
    comprehensiveMonthly,
    topInsurers,
  };
}

export interface TravelInsuranceInput {
  destination: "americas" | "europe" | "worldwide";
  durationDays: number;
  travelerAge: number;
}

export interface TravelInsuranceResult {
  estimatedTotal: number;
  costPerDay: number;
  topInsurers: Array<{
    slug: string;
    name: string;
    estimatedTotal: number;
    rating: number;
  }>;
}

export function calculateTravelInsurance(
  input: TravelInsuranceInput
): TravelInsuranceResult {
  // Base cost per day
  let dailyRate = 20; // R$20 per day base

  // Destination multiplier
  const destMultiplier =
    input.destination === "worldwide"
      ? 1.5
      : input.destination === "europe"
        ? 1.3
        : 1.0;
  dailyRate *= destMultiplier;

  // Age adjustment
  let ageMultiplier = 1.0;
  if (input.travelerAge > 60) {
    ageMultiplier = 1.5;
  } else if (input.travelerAge > 70) {
    ageMultiplier = 2.0;
  }
  dailyRate *= ageMultiplier;

  const estimatedTotal = Math.round(dailyRate * input.durationDays);
  const costPerDay = Math.round(dailyRate);

  const topInsurers = insurers
    .filter((i) => i.products.includes("viagem"))
    .slice(0, 3)
    .map((i) => ({
      slug: i.slug,
      name: i.name,
      estimatedTotal: Math.round(estimatedTotal * (i.rating / 4.5)),
      rating: i.rating,
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    estimatedTotal,
    costPerDay,
    topInsurers,
  };
}
