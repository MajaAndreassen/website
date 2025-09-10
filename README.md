# Maja A. Moger - Personal Website

A SEO-optimized personal website built with Next.js, featuring dynamic content and proper search engine optimization.

## 🚀 SEO Features

### Dynamic Sitemap
- **Location**: `/app/sitemap.ts` 
- **Generates**: `/sitemap.xml`
- **Includes**:
  - All static pages (home, drawings, projects, micro, travel, product)
  - Dynamic drawing pages with date-based URLs
  - Individual project pages
  - Blog posts from all categories

### SEO Optimizations
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Proper meta tags and OpenGraph data
- ✅ Canonical URLs for all pages
- ✅ No trailing slashes (SEO-friendly URLs)
- ✅ Proper redirects handling
- ✅ Security headers
- ✅ Structured data (JSON-LD) for drawings

### Google Search Console Issues - RESOLVED

The "Viderekoblingsfeil" (Redirect error) issue has been addressed by:

1. **Trailing Slash Configuration**: Set to `false` in both `next.config.js` and `vercel.json`
2. **Proper Redirects**: Added redirect rules to handle inconsistent URL formats
3. **Clean URLs**: Enabled in Vercel configuration
4. **Consistent URL Structure**: All URLs now follow the same pattern without trailing slashes

## 🛠️ Technical Setup

### Configuration Files

#### `next.config.js`
- Static export configuration
- Image optimization disabled for static hosting
- Trailing slash set to `false`

#### `vercel.json`
- Clean URLs enabled
- Trailing slash redirects
- Proper headers for SEO files
- Security headers

#### `app/sitemap.ts`
- Dynamic sitemap generation
- Includes all content types
- Proper lastModified dates
- SEO-friendly priorities

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with metadataBase
├── sitemap.ts          # Dynamic sitemap generator
├── robots.ts           # Robots.txt configuration
├── [category]/[slug]/  # Dynamic content pages
├── drawings/[year]/[month]/[day]/[slug]/  # Date-based drawing URLs
└── ...                 # Other pages

content/
├── drawings/           # Drawing markdown files
├── projects/           # Project markdown files
├── micro/             # Micro blog posts
├── travel/            # Travel posts
└── product/           # Product reviews

vercel.json            # Deployment configuration
public/.htaccess       # Apache configuration (if needed)
```

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
```

### SEO Testing
```powershell
# Run the SEO build script
.\seo-build.ps1
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. The `vercel.json` file will handle all configurations
3. Deploy automatically on push to main

### Manual Deployment
1. Run `npm run build`
2. Deploy the `out/` folder to your hosting provider
3. Ensure your hosting supports the redirect rules in `vercel.json`

## 📊 SEO Checklist

After deployment, verify:

- [ ] Sitemap accessible at `https://www.majamoger.com/sitemap.xml`
- [ ] Robots.txt accessible at `https://www.majamoger.com/robots.txt`
- [ ] No trailing slashes on URLs
- [ ] Proper redirects working
- [ ] All pages have meta descriptions
- [ ] All pages have canonical URLs
- [ ] OpenGraph images resolving correctly

### Google Search Console
1. Submit sitemap: `https://www.majamoger.com/sitemap.xml`
2. Monitor for crawling errors
3. Check URL inspection tool for any issues

## 🔍 Testing URLs

Important URLs to test after deployment:

- **Sitemap**: https://www.majamoger.com/sitemap.xml
- **Robots**: https://www.majamoger.com/robots.txt
- **Home**: https://www.majamoger.com (no trailing slash)
- **Drawings**: https://www.majamoger.com/drawings
- **Individual Drawing**: https://www.majamoger.com/drawings/2025/08/17/sketch-collection-07
- **Projects**: https://www.majamoger.com/projects/lyngen-seaside

## 🐛 Troubleshooting

### Common Issues

**Sitemap not generating**:
- Check that markdown files have proper frontmatter
- Verify file paths in `lib/markdown.ts`
- Run build locally to test

**Redirect errors**:
- Ensure `vercel.json` is properly deployed
- Check that trailing slash is set to `false`
- Verify no conflicting redirect rules

**Missing metadata**:
- Check that `metadataBase` is set in `layout.tsx`
- Verify individual page metadata

## 📝 Adding New Content

### Drawings
Add markdown files to `content/drawings/` with frontmatter:
```yaml
---
title: "Drawing Title"
date: "2025-09-10"
image: "/images/drawings/image.jpg"
medium: "Pencil and paper"
description: "Description here"
---
```

### Projects
Add markdown files to `content/projects/` with frontmatter:
```yaml
---
title: "Project Title"
date: "2025-09-10"
excerpt: "Short description"
status: "active"
tech: ["Technology", "Used"]
website: "https://example.com"
---
```

The sitemap will automatically include new content on the next build.

## 🔐 Security

Security headers are configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

## 📞 Support

For issues related to:
- **SEO**: Check Google Search Console
- **Deployment**: Review Vercel dashboard
- **Content**: Verify markdown frontmatter
- **Redirects**: Test with browser dev tools
