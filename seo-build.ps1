# SEO Check and Build Script for Maja's Website (PowerShell)

Write-Host "🚀 Starting SEO-friendly build process..." -ForegroundColor Green

# Check if Node.js and npm are available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies." -ForegroundColor Red
    exit 1
}

# Check for TypeScript errors
Write-Host "🔍 Checking TypeScript..." -ForegroundColor Yellow
try {
    npx tsc --noEmit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ TypeScript errors found. Please fix them before deployment." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ TypeScript check passed" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  TypeScript check skipped (tsc not available)" -ForegroundColor Yellow
}

# Lint the code
Write-Host "🔍 Linting code..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Linting issues found. Consider fixing them for better code quality." -ForegroundColor Yellow
}

# Build the project
Write-Host "🏗️  Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green

# Check if sitemap.xml is generated
if (Test-Path "./out/sitemap.xml") {
    Write-Host "✅ Sitemap generated successfully" -ForegroundColor Green
    $urlCount = (Select-String -Path "./out/sitemap.xml" -Pattern "<url>").Length
    Write-Host "📄 Sitemap contains $urlCount URLs" -ForegroundColor Cyan
}
else {
    Write-Host "❌ Sitemap.xml not found in build output" -ForegroundColor Red
}

# Check if robots.txt is generated
if (Test-Path "./out/robots.txt") {
    Write-Host "✅ Robots.txt generated successfully" -ForegroundColor Green
}
else {
    Write-Host "❌ Robots.txt not found in build output" -ForegroundColor Red
}

# Check for important SEO files
Write-Host "🔍 Checking SEO files..." -ForegroundColor Yellow
$filesToCheck = @(
    "out/index.html",
    "out/drawings/index.html", 
    "out/projects/index.html", 
    "out/micro/index.html", 
    "out/travel/index.html", 
    "out/product/index.html"
)

foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Check if meta description exists
        if ($content -match '<meta name="description"') {
            Write-Host "✅ Meta description found in $file" -ForegroundColor Green
        }
        else {
            Write-Host "⚠️  Meta description missing in $file" -ForegroundColor Yellow
        }
        
        # Check if canonical URL exists
        if ($content -match '<link rel="canonical"') {
            Write-Host "✅ Canonical URL found in $file" -ForegroundColor Green
        }
        else {
            Write-Host "⚠️  Canonical URL missing in $file" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ $file not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Build process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy the 'out' folder to your hosting platform"
Write-Host "2. Ensure vercel.json is configured on your hosting platform"
Write-Host "3. Test the sitemap at https://maja-moger.com/sitemap.xml"
Write-Host "4. Submit the sitemap to Google Search Console"
Write-Host "5. Monitor Google Search Console for any crawling issues"
Write-Host ""
Write-Host "🔗 Important URLs to test:" -ForegroundColor Cyan
Write-Host "- https://maja-moger.com/sitemap.xml"
Write-Host "- https://maja-moger.com/robots.txt"
Write-Host "- Main pages should not have trailing slashes"
