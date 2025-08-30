import { MetadataRoute } from 'next';
import { getDrawings, getProjects, getAllPosts } from '@/lib/markdown';

export async function GET(): Promise<Response> {
  const baseUrl = 'https://maja-moger.com'; // Replace with your actual domain
  
  // Get all content
  const drawings = getDrawings();
  const projects = getProjects();
  const microPosts = getAllPosts('micro');
  const travelPosts = getAllPosts('travel');
  const productPosts = getAllPosts('product');

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/drawings`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/micro`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/travel`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Drawing pages
  const drawingPages = drawings.map((drawing) => {
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

  // Project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog post pages
  const microPages = microPosts.map((post) => ({
    url: `${baseUrl}/micro/${post!.slug}`,
    lastModified: new Date(post!.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const travelPages = travelPosts.map((post) => ({
    url: `${baseUrl}/travel/${post!.slug}`,
    lastModified: new Date(post!.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const productPages = productPosts.map((post) => ({
    url: `${baseUrl}/product/${post!.slug}`,
    lastModified: new Date(post!.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const allPages = [
    ...staticPages,
    ...drawingPages,
    ...projectPages,
    ...microPages,
    ...travelPages,
    ...productPages,
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
