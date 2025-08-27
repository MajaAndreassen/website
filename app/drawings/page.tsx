import { Metadata } from 'next';
import { getDrawings } from '@/lib/markdown';
import DrawingCard from '@/components/DrawingCard';

export const metadata: Metadata = {
  title: 'Drawings & Visual Art',
  description: 'A collection of drawings, sketches, and visual explorations by Maja A. Moger. Featuring pencil drawings, artistic experiments, and creative visual studies.',
  keywords: ['drawings', 'sketches', 'art', 'visual art', 'pencil drawings', 'artistic exploration', 'creative work'],
  openGraph: {
    title: 'Drawings & Visual Art | Maja A. Moger',
    description: 'A collection of drawings, sketches, and visual explorations by Maja A. Moger.',
    type: 'website',
    images: [
      {
        url: '/images/drawings-og.jpg', // You might want to create this
        width: 1200,
        height: 630,
        alt: 'Maja A. Moger - Drawings Collection',
      },
    ],
  },
  alternates: {
    canonical: 'https://maja-moger.com/drawings',
  },
};

export default function Drawings() {
  const drawings = getDrawings();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Drawings</h1>
      
      <p className="text-gray-600 mb-8">
        Visual explorations, sketches, and artistic experiments.
      </p>
      
      {drawings.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {drawings.map((drawing) => (
            <DrawingCard
              key={drawing.slug}
              title={drawing.title}
              image={drawing.image}
              date={drawing.date}
              description={drawing.description}
              medium={drawing.medium}
              slug={drawing.slug}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No drawings yet. Check back soon!</p>
      )}
    </div>
  );
}