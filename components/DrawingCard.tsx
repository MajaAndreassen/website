'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDate } from '@/lib/date-utils';

interface DrawingCardProps {
  title: string;
  image: string;
  date: string;
  description?: string;
  medium?: string;
}

export default function DrawingCard({ title, image, date, description, medium }: DrawingCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
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
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="space-y-2 text-sm">
              <p><strong>Date:</strong> {formatDate(date)}</p>
              {medium && <p><strong>Medium:</strong> {medium}</p>}
              {description && (
                <div>
                  <strong>Notes:</strong>
                  <p className="mt-1 text-gray-700">{description}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}