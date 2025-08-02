import { Metadata } from 'next';
import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Travel - Maja A. Moger',
  description: 'Stories and photos from places I\'ve been.',
};

export default function Travel() {
  const posts = getAllPosts('travel');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Travel</h1>
      
      <p className="text-gray-600 mb-8">
        Stories, photos, and experiences from places I've been lucky enough to visit.
      </p>
      
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post!.slug}
              title={post!.meta.title}
              date={post!.meta.date}
              excerpt={post!.meta.excerpt}
              href={`/travel/${post!.slug}`}
              category="travel"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No travel stories yet. Check back soon!</p>
      )}
    </div>
  );
}