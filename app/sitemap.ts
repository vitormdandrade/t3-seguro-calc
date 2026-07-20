import { MetadataRoute } from 'next';
import insuranceTypes from '../data/insurance-types.json';
import insurers from '../data/insurers.json';
import states from '../data/states.json';
import { guides } from '../data/guides';
import { vidaGuides } from '../data/vida-guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculadora/seguro-auto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora/seguro-vida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora/seguro-residencial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora/seguro-saude`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora/seguro-viagem`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seguros`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seguradoras`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/comparativo-2026`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/lp/seguro-auto`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const insuranceTypePages: MetadataRoute.Sitemap = insuranceTypes.map((type) => ({
    url: `${baseUrl}/seguros/${type.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const insurerPages: MetadataRoute.Sitemap = insurers.map((insurer) => ({
    url: `${baseUrl}/seguradoras/${insurer.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const TIPO_SLUGS = ['seguro-auto', 'seguro-vida', 'seguro-residencial', 'seguro-saude', 'seguro-viagem'];

  const stateHubPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/estado`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ];

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/estado/${state.uf.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const stateTipoPages: MetadataRoute.Sitemap = states.flatMap((state) =>
    TIPO_SLUGS.map((tipo) => ({
      url: `${baseUrl}/estado/${state.uf.toLowerCase()}/${tipo}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guias/${guide.slug}`,
    lastModified: new Date(guide.updatedOn),
    changeFrequency: 'monthly' as const,
    priority: guide.category === 'trust' ? 0.85 : 0.75,
  }));

  const vidaHubPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/seguro-vida`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const vidaGuidePages: MetadataRoute.Sitemap = vidaGuides.map((guide) => ({
    url: `${baseUrl}/seguro-vida/${guide.slug}`,
    lastModified: new Date(guide.updatedOn),
    changeFrequency: 'monthly' as const,
    priority: guide.tag === 'Guia Mestre' ? 0.88 : 0.8,
  }));

  return [
    ...staticPages,
    ...insuranceTypePages,
    ...insurerPages,
    ...stateHubPage,
    ...statePages,
    ...stateTipoPages,
    ...guidePages,
    ...vidaHubPage,
    ...vidaGuidePages,
  ];
}
