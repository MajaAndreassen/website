import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, markdownToHtml, getAllPosts } from '@/lib/markdown';
import { formatDate } from '@/lib/date-utils';

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = ['micro', 'tried-tested', 'travel', 'projects'];
  const paths = [];
  
  for (const category of categories) {
    const posts = getAllPosts(category);
    for (const post of posts) {
      paths.push({
        category,
        slug: post!.slug,
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.category, params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.meta.title} - Maja A. Moger`,
    description: post.meta.excerpt || post.content.substring(0, 160),
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.category, params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <article className="prose prose-gray max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.meta.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <time>{formatDate(post.meta.date)}</time>
          <span className="capitalize">{params.category.replace('-', ' & ')}</span>
        </div>
      </header>
      
      <div 
        className="prose-lg prose-gray leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}