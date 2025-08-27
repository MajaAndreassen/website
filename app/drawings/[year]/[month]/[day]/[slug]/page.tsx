import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDrawings } from '@/lib/markdown';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/date-utils';
import { ArrowLeft } from 'lucide-react';

interface DrawingPageProps {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const drawings = getDrawings();
  
  return drawings.map((drawing) => {
    const date = new Date(drawing.date);
    return {
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      day: date.getDate().toString().padStart(2, '0'),
      slug: drawing.slug,
    };
  });
}

export async function generateMetadata({ params }: DrawingPageProps): Promise<Metadata> {
  const drawing = findDrawingByParams(params);
  
  if (!drawing) {
    return {
      title: 'Drawing Not Found',
    };
  }

  const date = new Date(drawing.date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const canonicalUrl = `https://maja-moger.com/drawings/${year}/${month}/${day}/${drawing.slug}`;

  return {
    title: `${drawing.title}`,
    description: drawing.description.length > 160 
      ? drawing.description.substring(0, 157) + '...'
      : drawing.description,
    keywords: ['drawing', 'sketch', 'art', 'visual art', drawing.medium, 'Maja Moger'].filter((k): k is string => Boolean(k)),
    authors: [{ name: 'Maja A. Moger' }],
    openGraph: {
      title: `${drawing.title} | Drawings | Maja A. Moger`,
      description: drawing.description.length > 160 
        ? drawing.description.substring(0, 157) + '...'
        : drawing.description,
      type: 'article',
      publishedTime: drawing.date,
      authors: ['Maja A. Moger'],
      images: [
        {
          url: drawing.image,
          width: 800,
          height: 600,
          alt: drawing.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${drawing.title} | Drawings | Maja A. Moger`,
      description: drawing.description.length > 160 
        ? drawing.description.substring(0, 157) + '...'
        : drawing.description,
      images: [drawing.image],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function findDrawingByParams(params: DrawingPageProps['params']) {
  const drawings = getDrawings();
  
  return drawings.find((drawing) => {
    const date = new Date(drawing.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return (
      year === params.year &&
      month === params.month &&
      day === params.day &&
      drawing.slug === params.slug
    );
  });
}

export default async function DrawingPage({ params }: DrawingPageProps) {
  const drawing = findDrawingByParams(params);

  if (!drawing) {
    notFound();
  }

  const contentHtml = await markdownToHtml(drawing.description);

  const date = new Date(drawing.date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const canonicalUrl = `https://maja-moger.com/drawings/${year}/${month}/${day}/${drawing.slug}`;

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: drawing.title,
    description: drawing.description,
    image: drawing.image,
    creator: {
      '@type': 'Person',
      name: 'Maja A. Moger',
    },
    dateCreated: drawing.date,
    medium: drawing.medium,
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/drawings" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Drawings
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">{drawing.title}</h1>
        <p className="text-gray-600">{formatDate(drawing.date)}</p>
        {drawing.medium && (
          <p className="text-gray-600">{drawing.medium}</p>
        )}
      </div>

      <div className="mb-8">
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={drawing.image}
            alt={drawing.title}
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {drawing.description && (
        <div 
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
      </div>
    </>
  );
}
