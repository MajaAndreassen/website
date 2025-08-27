import { Metadata } from 'next';
import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Tried & Tested Reviews',
  description: 'Honest reviews of products, services, and tools I&apos;ve actually used. No affiliate links, just real experiences and genuine recommendations.',
  keywords: ['reviews', 'product reviews', 'service reviews', 'honest reviews', 'recommendations', 'tested products', 'tried and tested'],
  openGraph: {
    title: 'Tried & Tested Reviews | Maja A. Moger',
    description: 'Honest reviews of products, services, and tools I&apos;ve actually used.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://maja-moger.com/tried-tested',
  },
};

export default function TriedTested() {
  const posts = getAllPosts('tried-tested');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tried & Tested</h1>
      
      <p className="text-gray-600 mb-8">
        Honest reviews of products, services, and tools I&apos;ve actually used.
        No affiliate links, just real experiences.
      </p>
      
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard
              key={post!.slug}
              title={post!.meta.title}
              date={post!.meta.date}
              excerpt={post!.meta.excerpt}
              href={`/tried-tested/${post!.slug}`}
              category="tried-tested"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No reviews yet. Check back soon!</p>
      )}
    </div>
  );
}