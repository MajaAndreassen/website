import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface Drawing {
  slug: string;
  title: string;
  date: string;
  image: string;
  medium?: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  status?: 'active' | 'completed' | 'on-hold';
  tech: string | string[];
  github?: string;
  demo?: string;
  description: string;
}

const postsDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs(category: string) {
  const categoryPath = path.join(postsDirectory, category);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  return fs.readdirSync(categoryPath).filter(name => name.endsWith('.md'));
}

export function getPostBySlug(category: string, slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, category, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getAllPosts(category: string) {
  const slugs = getPostSlugs(category);
  const posts = slugs
    .map((slug) => getPostBySlug(category, slug))
    .filter(Boolean)
    .sort((post1, post2) => (post1!.meta.date > post2!.meta.date ? -1 : 1));
  return posts;
}

export function getDrawings(): Drawing[] {
  const drawingsPath = path.join(postsDirectory, 'drawings');
  if (!fs.existsSync(drawingsPath)) {
    return [];
  }
  
  const files = fs.readdirSync(drawingsPath).filter(name => name.endsWith('.md'));
  return files.map(file => {
    const { data, content } = matter(fs.readFileSync(path.join(drawingsPath, file), 'utf8'));
    return {
      slug: file.replace(/\.md$/, ''),
      ...data,
      description: content,
    } as Drawing;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjects(): Project[] {
  const projectsPath = path.join(postsDirectory, 'projects');
  if (!fs.existsSync(projectsPath)) {
    return [];
  }
  
  const files = fs.readdirSync(projectsPath).filter(name => name.endsWith('.md'));
  return files.map(file => {
    const { data, content } = matter(fs.readFileSync(path.join(projectsPath, file), 'utf8'));
    return {
      slug: file.replace(/\.md$/, ''),
      ...data,
      description: content,
    } as Project;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}