'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate, generateDrawingUrl } from '@/lib/date-utils';

interface DrawingCardProps {
  title: string;
  image: string;
  date: string;
  description?: string;
  medium?: string;
  slug: string;
}

export default function DrawingCard({ title, image, date, description, medium, slug }: DrawingCardProps) {
  const drawingUrl = generateDrawingUrl(date, slug);
  const altText = `${title} - ${medium || 'Artwork'} by Maja A. Moger`;

  return (
    <Link href={drawingUrl} className="cursor-pointer group block">
      <article itemScope itemType="https://schema.org/VisualArtwork">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
          <Image
            src={image}
            alt={altText}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        <h3 className="font-medium text-sm group-hover:underline" itemProp="name">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">
          <time dateTime={date} itemProp="dateCreated">{formatDate(date)}</time>
          {medium && <span className="ml-2" itemProp="artMedium">• {medium}</span>}
        </p>
        {description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2" itemProp="description">
            {description}
          </p>
        )}
        <meta itemProp="creator" content="Maja A. Moger" />
        <meta itemProp="image" content={image} />
      </article>
    </Link>
  );
}