export const AFFILIATE_CONFIG = {
  porto_seguro: {
    name: "Porto Seguro",
    base_url: "https://www.portoseguro.com.br",
    utm_campaign: "calculadora-portoseguro",
    commission_range: "R$50-150",
  },
  bradesco: {
    name: "Bradesco Seguros",
    base_url: "https://www.bradescoseguros.com.br",
    utm_campaign: "calculadora-bradesco",
    commission_range: "R$50-150",
  },
  suhai: {
    name: "Suhai",
    base_url: "https://www.suhai.com.br",
    utm_campaign: "calculadora-suhai",
    commission_range: "R$100-200",
  },
  youse: {
    name: "Youse",
    base_url: "https://www.youse.com.br",
    utm_campaign: "calculadora-youse",
    commission_range: "R$100-200",
  },
  pier: {
    name: "Pier",
    base_url: "https://www.pierclickapi.com.br",
    utm_campaign: "calculadora-pier",
    commission_range: "R$100-200",
  },
  mapfre: {
    name: "Mapfre",
    base_url: "https://www.mapfre.com.br",
    utm_campaign: "calculadora-mapfre",
    commission_range: "R$50-150",
  },
  sulamerica: {
    name: "SulAmérica",
    base_url: "https://www.sulamerica.com.br",
    utm_campaign: "calculadora-sulamerica",
    commission_range: "R$50-150",
  },
  allianz: {
    name: "Allianz Brasil",
    base_url: "https://www.allianz.com.br",
    utm_campaign: "calculadora-allianz",
    commission_range: "R$50-150",
  },
};

export const buildAffiliateUrl = (
  insurerSlug: string,
  sourceType: string,
  leadId: string
) => {
  const config = AFFILIATE_CONFIG[insurerSlug as keyof typeof AFFILIATE_CONFIG];
  if (!config) return "#";

  const params = new URLSearchParams({
    utm_source: "calculadora-seguros",
    utm_campaign: config.utm_campaign,
    utm_medium: sourceType,
    utm_content: leadId,
  });

  return `${config.base_url}?${params.toString()}`;
};
