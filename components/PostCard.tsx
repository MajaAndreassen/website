import Link from 'next/link';
import { formatDate } from '@/lib/date-utils';

interface PostCardProps {
  title: string;
  date: string;
  excerpt?: string;
  href: string;
  category: 'micro' | 'tried-tested' | 'travel';
}

export default function PostCard({ title, date, excerpt, href, category }: PostCardProps) {
  return (
    <article className="rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex items-center justify-between mb-2">
        <time className="text-sm text-gray-600">{formatDate(date)}</time>
      </div>
      
      <Link href={href} className="group">
        <h3 className="text-lg font-medium mb-2 group-hover:underline text-gray-900">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}