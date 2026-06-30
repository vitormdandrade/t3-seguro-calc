import carModels from "../../data/car-models.json";
import states from "../../data/states.json";
import insurers from "../../data/insurers.json";

export interface HealthInsuranceInput {
  age: number;
  coverageType: "ambulatorial" | "hospitalar" | "referencia" | "enfermaria";
  city: string;
  dependents: number;
}

export interface HealthInsuranceResult {
  monthlyMin: number;
  monthlyMax: number;
  coverageType: string;
  riskTier: string;
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
  // Base prices by coverage type (monthly, per person)
  const coverageBase: Record<string, number> = {
    ambulatorial: 180,
    hospitalar: 350,
    referencia: 500,
    enfermaria: 420,
  };

  let basePrice = coverageBase[input.coverageType] || 350;

  // Age multiplier — health plans increase sharply with age
  let ageMultiplier = 1.0;
  if (input.age < 18) ageMultiplier = 0.7;
  else if (input.age <= 23) ageMultiplier = 0.8;
  else if (input.age <= 33) ageMultiplier = 1.0;
  else if (input.age <= 43) ageMultiplier = 1.3;
  else if (input.age <= 48) ageMultiplier = 1.6;
  else if (input.age <= 53) ageMultiplier = 2.0;
  else if (input.age <= 58) ageMultiplier = 2.5;
  else if (input.age <= 65) ageMultiplier = 3.2;
  else ageMultiplier = 3.8;

  basePrice *= ageMultiplier;

  // Dependents multiplier (each dependent adds ~80% of the base cost)
  const dependentsMultiplier = 1 + input.dependents * 0.8;
  basePrice *= dependentsMultiplier;

  // City/region multiplier using state data if city maps to a state
  // Default SP multiplier (moderate)
  let cityMultiplier = 1.0;
  const cityUpper = input.city.toUpperCase();
  const state = states.find((s) => s.uf === cityUpper);
  if (state) {
    cityMultiplier = state.auto_index || 1.0;
  } else {
    // Capital cities approximate mapping
    const cityMap: Record<string, number> = {
      "SÃO PAULO": 1.15,
      "RIO DE JANEIRO": 1.10,
      "BRASÍLIA": 1.05,
      "BELO HORIZONTE": 0.95,
      "CURITIBA": 0.90,
      "PORTO ALEGRE": 0.92,
      "SALVADOR": 0.88,
      "RECIFE": 0.87,
      "FORTALEZA": 0.85,
      "MANAUS": 0.82,
    };
    cityMultiplier = cityMap[input.city.toUpperCase()] || 1.0;
  }

  basePrice *= cityMultiplier;

  const monthlyMin = Math.round(basePrice * 0.8);
  const monthlyMax = Math.round(basePrice * 1.2);

  // Risk tier
  let riskTier = "baixo";
  if (basePrice > 1500) riskTier = "alto";
  else if (basePrice > 800) riskTier = "médio";

  const coverageLabels: Record<string, string> = {
    ambulatorial: "Ambulatorial",
    hospitalar: "Hospitalar",
    referencia: "Referência (ANS)",
    enfermaria: "Enfermaria",
  };

  const topInsurers = insurers
    .filter((i) => i.products.includes("saude"))
    .slice(0, 4)
    .map((i) => ({
      slug: i.slug,
      name: i.name,
      estimatedMonthly: Math.round(
        ((monthlyMin + monthlyMax) / 2) * (i.rating / 4.5)
      ),
      rating: i.rating,
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    monthlyMin,
    monthlyMax,
    coverageType: coverageLabels[input.coverageType],
    riskTier,
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
