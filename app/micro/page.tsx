import { Metadata } from 'next';
import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Micro Posts & Quick Thoughts',
  description: 'Quick thoughts, experiments, and observations that don&apos;t quite fit elsewhere. Short-form content about technology, creativity, and daily discoveries.',
  keywords: ['micro posts', 'thoughts', 'observations', 'experiments', 'short form content', 'blog', 'quick notes'],
  openGraph: {
    title: 'Micro Posts & Quick Thoughts | Maja A. Moger',
    description: 'Quick thoughts, experiments, and observations that don&apos;t quite fit elsewhere.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://maja-moger.com/micro',
  },
};

export default function Micro() {
  const posts = getAllPosts('micro');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Micro Posts & Quick Thoughts',
    description: 'Quick thoughts, experiments, and observations by Maja A. Moger',
    url: 'https://maja-moger.com/micro',
    author: {
      '@type': 'Person',
      name: 'Maja A. Moger',
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-8">Micro</h1>
      
      <p className="text-gray-600 mb-8">
        Quick thoughts, experiments, and observations that don&apos;t quite fit elsewhere.
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