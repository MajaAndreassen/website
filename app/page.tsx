import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Maja A. Moger',
  description: 'Personal blog and portfolio of Maja A. Moger - developer, designer, and creative.',
};

export default function About() {
  return (
    <div className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold mb-8">About</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Hi, I'm Maja A. Moger. This is my personal space on the internet where I share
          projects I'm working on, drawings I create, random thoughts, product reviews,
          and stories from my travels.
        </p>
        
        <p>
          I believe in learning through curiosity, exploring creativity through art,
          and documenting the journey along the way. This site is a collection of those
          experiences and experiments.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">What you'll find here</h2>
        
        <ul className="space-y-2">
          <li><strong>Projects</strong> - Bigger things I'm building and working on</li>
          <li><strong>Drawings</strong> - Visual explorations and artistic experiments</li>
          <li><strong>Micro</strong> - Quick thoughts, experiments, and observations</li>
          <li><strong>Tried & Tested</strong> - Honest reviews of products and services</li>
          <li><strong>Travel</strong> - Stories and photos from places I've been</li>
        </ul>
        
        <p className="pt-6">
          Feel free to reach out if any of this resonates with you or if you'd like
          to collaborate on something interesting.
        </p>
        
        <div className="flex gap-4 text-sm">
          <a href="mailto:andreassenmajaa@gmail.com" className="text-blue-600 hover:underline">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}