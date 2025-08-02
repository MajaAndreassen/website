import { Metadata } from 'next';
import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Micro - Maja A. Moger',
  description: 'Quick thoughts, experiments, and observations.',
};

export default function Micro() {
  const posts = getAllPosts('micro');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Micro</h1>
      
      <p className="text-gray-600 mb-8">
        Quick thoughts, experiments, and observations that don't quite fit elsewhere.
      </p>
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post!.slug}
              title={post!.meta.title}
              date={post!.meta.date}
              excerpt={post!.meta.excerpt}
              href={`/micro/${post!.slug}`}
              category="micro"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No micro posts yet. Check back soon!</p>
      )}
    </div>
  );
}