import { MetadataRoute } from 'next';
import insuranceTypes from '@/../../data/insurance-types.json';
import insurers from '@/../../data/insurers.json';
import states from '@/../../data/states.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://t3-seguro-calc.vercel.app';

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
      priority: 0.8,
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

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/estado/${state.uf}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...insuranceTypePages,
    ...insurerPages,
    ...statePages,
  ];
}
