import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maja A. Moger - Creative Developer & Artist',
  description: 'Personal blog and portfolio of Maja A. Moger - developer, designer, and creative. Featuring projects, drawings, thoughts, reviews, and travel stories.',
  keywords: ['Maja Moger', 'developer', 'designer', 'artist', 'creative', 'portfolio', 'blog', 'projects', 'drawings'],
  openGraph: {
    title: 'Maja A. Moger - Creative Developer & Artist',
    description: 'Personal blog and portfolio featuring projects, drawings, thoughts, reviews, and travel stories.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://maja-moger.com',
  },
};

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maja A. Moger',
    jobTitle: 'Creative Developer & Artist',
    description: 'Developer, designer, and creative sharing projects, drawings, thoughts, reviews, and travel stories.',
    url: 'https://maja-moger.com',
    sameAs: [
      // Add your social media profiles here when available
      // 'https://twitter.com/yourusername',
      // 'https://github.com/yourusername',
    ],
    knowsAbout: [
      'Web Development',
      'Design',
      'Art',
      'Drawing',
      'Creative Projects',
      'Travel',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold mb-8">About</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Hi, I&apos;m Maja Moger. This is my personal space on the internet where I share
          projects I&apos;m working on, drawings I create, random thoughts, product reviews,
          and stories from my travels.
        </p>
        
        <p>
          I believe in learning through curiosity, exploring creativity through art,
          and documenting the journey along the way. This site is a collection of those
          experiences and experiments.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">What you&apos;ll find here</h2>
        
        <ul className="space-y-2">
          <li><strong>Projects</strong> - Bigger things I&apos;m building and working on</li>
          <li><strong>Drawings</strong> - Visual explorations and artistic experiments</li>
          <li><strong>Micro</strong> - Quick thoughts, experiments, and observations</li>
          <li><strong>Tried & Tested</strong> - Honest reviews of products and services</li>
          <li><strong>Travel</strong> - Stories and photos from places I&apos;ve been</li>
        </ul>
        
        <p className="pt-6">
          Feel free to reach out if any of this resonates with you or if you&apos;d like
          to collaborate on something interesting.
        </p>
        
        <div className="flex gap-4 text-sm">
          <a href="mailto:andreassenmajaa@gmail.com" className="text-blue-600 hover:underline">
            Email
          </a>
        </div>
      </div>
      </div>
    </>
  );
}