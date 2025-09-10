import { MetadataRoute } from 'next';
import { getDrawings, getProjects, getAllPosts } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maja-moger.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/drawings`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/micro`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/travel`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic drawing pages with date-based URLs
  const drawings = getDrawings();
  const drawingPages: MetadataRoute.Sitemap = drawings.map((drawing) => {
    const date = new Date(drawing.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return {
      url: `${baseUrl}/drawings/${year}/${month}/${day}/${drawing.slug}`,
      lastModified: new Date(drawing.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  // Dynamic project pages using [category]/[slug] route
  const projects = getProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic micro blog posts using [category]/[slug] route
  const microPosts = getAllPosts('micro');
  const microPages: MetadataRoute.Sitemap = microPosts.map((post) => ({
    url: `${baseUrl}/micro/${post!.slug}`,
    lastModified: new Date(post!.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Dynamic travel posts using [category]/[slug] route
  const travelPosts = getAllPosts('travel');
  const travelPages: MetadataRoute.Sitemap = travelPosts.map((post) => ({
    url: `${baseUrl}/travel/${post!.slug}`,
    lastModified: new Date(post!.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic product posts using [category]/[slug] route
  const productPosts = getAllPosts('product');
  const productPages: MetadataRoute.Sitemap = productPosts.map((post) => ({
    url: `${baseUrl}/product/${post!.slug}`,
    lastModified: new Date(post!.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...drawingPages,
    ...projectPages,
    ...microPages,
    ...travelPages,
    ...productPages,
  ];
}
