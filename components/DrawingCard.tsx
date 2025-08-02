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

  return (
    <Link href={drawingUrl} className="cursor-pointer group block">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-medium text-sm group-hover:underline">{title}</h3>
      <p className="text-xs text-gray-600 mt-1">{formatDate(date)}</p>
    </Link>
  );
}