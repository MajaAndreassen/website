import { Metadata } from 'next';
import { getDrawings } from '@/lib/markdown';
import DrawingCard from '@/components/DrawingCard';

export const metadata: Metadata = {
  title: 'Drawings - Maja A. Moger',
  description: 'A collection of drawings and visual explorations.',
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