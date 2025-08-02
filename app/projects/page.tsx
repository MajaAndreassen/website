import { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/markdown';
import { formatDate } from '@/lib/date-utils';

export const metadata: Metadata = {
  title: 'Projects - Maja A. Moger',
  description: 'A collection of projects and things I\'ve built.',
};

export default function Projects() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      
      <p className="text-gray-600 mb-8">
        A collection of bigger projects and things I've built or am working on.
      </p>
      
      <div className="space-y-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article key={project.slug} className="border-b border-gray-200 pb-8">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-xl font-semibold">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </h2>
                {project.status && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-700' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{formatDate(project.date)}</p>
              
              {project.tech && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {(Array.isArray(project.tech) ? project.tech : [project.tech]).map((tech: string) => (
                    <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {project.excerpt || project.description.substring(0, 200) + '...'}
              </p>
              
              <div className="flex gap-4 text-sm">
                <Link href={`/projects/${project.slug}`} className="text-blue-600 hover:underline">
                  Read more
                </Link>
                {project.github && (
                  <a href={project.github} className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} className="text-blue-600 hover:underline">
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500 italic">No projects yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}