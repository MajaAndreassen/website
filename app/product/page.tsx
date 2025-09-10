import { Metadata } from 'next';
import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Reviews of products, services, and tools I&apos;ve actually used. No affiliate links, just real experiences and genuine recommendations.',
  keywords: ['reviews', 'product reviews', 'service reviews', 'honest reviews', 'recommendations', 'tested products'],
  openGraph: {
    title: 'Product | Maja A. Moger',
    description: 'Honest reviews of products, services, and tools I&apos;ve actually used.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.majamoger.com/product',
  },
};

export default function Product() {
  const posts = getAllPosts('product');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Product</h1>
      
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
              href={`/product/${post!.slug}`}
              category="product"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No reviews yet. Check back soon!</p>
      )}
    </div>
  );
}
