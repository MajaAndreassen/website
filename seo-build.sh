#!/bin/bash

# SEO Check and Build Script for Maja's Website

echo "🚀 Starting SEO-friendly build process..."

# Check if Node.js and npm are available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for TypeScript errors
echo "🔍 Checking TypeScript..."
if command -v npx &> /dev/null; then
    npx tsc --noEmit
    if [ $? -ne 0 ]; then
        echo "❌ TypeScript errors found. Please fix them before deployment."
        exit 1
    fi
fi

echo "✅ TypeScript check passed"

# Lint the code
echo "🔍 Linting code..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found. Consider fixing them for better code quality."
fi

# Build the project
echo "🏗️  Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build completed successfully"

# Check if sitemap.xml is generated
if [ -f "./out/sitemap.xml" ]; then
    echo "✅ Sitemap generated successfully"
    echo "📄 Sitemap contains $(grep -c '<url>' ./out/sitemap.xml) URLs"
else
    echo "❌ Sitemap.xml not found in build output"
fi

# Check if robots.txt is generated
if [ -f "./out/robots.txt" ]; then
    echo "✅ Robots.txt generated successfully"
else
    echo "❌ Robots.txt not found in build output"
fi

# Check for important SEO files
echo "🔍 Checking SEO files..."
files_to_check=("out/index.html" "out/drawings/index.html" "out/projects/index.html" "out/micro/index.html" "out/travel/index.html" "out/product/index.html")

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        # Check if meta description exists
        if grep -q "<meta name=\"description\"" "$file"; then
            echo "✅ Meta description found in $file"
        else
            echo "⚠️  Meta description missing in $file"
        fi
        
        # Check if canonical URL exists
        if grep -q "<link rel=\"canonical\"" "$file"; then
            echo "✅ Canonical URL found in $file"
        else
            echo "⚠️  Canonical URL missing in $file"
        fi
    else
        echo "❌ $file not found"
    fi
done

echo ""
echo "🎉 Build process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy the 'out' folder to your hosting platform"
echo "2. Ensure vercel.json is configured on your hosting platform"
echo "3. Test the sitemap at https://www.majamoger.com/sitemap.xml"
echo "4. Submit the sitemap to Google Search Console"
echo "5. Monitor Google Search Console for any crawling issues"
echo ""
echo "🔗 Important URLs to test:"
echo "- https://www.majamoger.com/sitemap.xml"
echo "- https://www.majamoger.com/robots.txt"
echo "- Main pages should not have trailing slashes"
