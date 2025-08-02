import Link from 'next/link';
import { formatDate } from '@/lib/date-utils';

interface PostCardProps {
  title: string;
  date: string;
  excerpt?: string;
  href: string;
  category: 'micro' | 'tried-tested' | 'travel';
}

const categoryColors = {
  micro: 'bg-blue-50 text-blue-700 border-blue-200',
  'tried-tested': 'bg-green-50 text-green-700 border-green-200',
  travel: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function PostCard({ title, date, excerpt, href, category }: PostCardProps) {
  return (
    <article className={`border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 ${categoryColors[category]}`}>
      <div className="flex items-center justify-between mb-2">
        <time className="text-sm opacity-70">{formatDate(date)}</time>
      </div>
      
      <Link href={href} className="group">
        <h3 className="text-lg font-medium mb-2 group-hover:underline">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm opacity-80 line-clamp-2">
            {excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}