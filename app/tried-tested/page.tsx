import { Metadata } from 'next';
import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Tried & Tested - Maja A. Moger',
  description: 'Honest reviews of products and services I\'ve used.',
};

export default function TriedTested() {
  const posts = getAllPosts('tried-tested');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tried & Tested</h1>
      
      <p className="text-gray-600 mb-8">
        Honest reviews of products, services, and tools I've actually used.
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