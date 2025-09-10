# Sitemap Validation Script

param(
    [Parameter(Mandatory=$false)]
    [string]$BaseUrl = "https://maja-moger.com"
)

Write-Host "🔍 Validating SEO setup for $BaseUrl..." -ForegroundColor Green

# Function to test URL
function Test-Url($url, $description) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method HEAD -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $description - OK (Status: $($response.StatusCode))" -ForegroundColor Green
            return $true
        } else {
            Write-Host "⚠️  $description - Warning (Status: $($response.StatusCode))" -ForegroundColor Yellow
            return $false
        }
    } catch {
        Write-Host "❌ $description - Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to check sitemap content
function Test-Sitemap($url) {
    try {
        $response = Invoke-WebRequest -Uri $url -TimeoutSec 10
        $content = $response.Content
        
        # Count URLs in sitemap
        $urlCount = ([regex]::Matches($content, "<url>")).Count
        Write-Host "📄 Sitemap contains $urlCount URLs" -ForegroundColor Cyan
        
        # Check for important pages
        $importantPages = @(
            "$BaseUrl/drawings",
            "$BaseUrl/projects", 
            "$BaseUrl/micro",
            "$BaseUrl/travel",
            "$BaseUrl/product"
        )
        
        foreach ($page in $importantPages) {
            if ($content -match [regex]::Escape($page)) {
                Write-Host "✅ Found: $page" -ForegroundColor Green
            } else {
                Write-Host "❌ Missing: $page" -ForegroundColor Red
            }
        }
        
        return $true
    } catch {
        Write-Host "❌ Could not validate sitemap content: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

Write-Host ""
Write-Host "Testing core URLs..." -ForegroundColor Yellow

# Test main pages
$tests = @{
    "$BaseUrl" = "Homepage"
    "$BaseUrl/sitemap.xml" = "Sitemap"
    "$BaseUrl/robots.txt" = "Robots.txt"
    "$BaseUrl/drawings" = "Drawings page"
    "$BaseUrl/projects" = "Projects page"
    "$BaseUrl/micro" = "Micro page"
    "$BaseUrl/travel" = "Travel page"
    "$BaseUrl/product" = "Product page"
}

$passedTests = 0
$totalTests = $tests.Count

foreach ($test in $tests.GetEnumerator()) {
    if (Test-Url $test.Key $test.Value) {
        $passedTests++
    }
    Start-Sleep -Milliseconds 500  # Be nice to the server
}

Write-Host ""
Write-Host "Testing sitemap content..." -ForegroundColor Yellow
Test-Sitemap "$BaseUrl/sitemap.xml"

Write-Host ""
Write-Host "Testing redirect handling..." -ForegroundColor Yellow

# Test trailing slash redirects
$redirectTests = @{
    "$BaseUrl/" = "Homepage with trailing slash"
    "$BaseUrl/drawings/" = "Drawings with trailing slash"
    "$BaseUrl/projects/" = "Projects with trailing slash"
}

foreach ($test in $redirectTests.GetEnumerator()) {
    try {
        $response = Invoke-WebRequest -Uri $test.Key -MaximumRedirection 0 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 301 -or $response.StatusCode -eq 302) {
            Write-Host "✅ $($test.Value) - Redirect working (Status: $($response.StatusCode))" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $($test.Value) - No redirect (Status: $($response.StatusCode))" -ForegroundColor Yellow
        }
    } catch {
        # This might be expected if the redirect works properly
        Write-Host "ℹ️  $($test.Value) - Redirect behavior unclear" -ForegroundColor Cyan
    }
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "📊 Results Summary:" -ForegroundColor Cyan
Write-Host "Passed: $passedTests/$totalTests core URL tests" -ForegroundColor $(if ($passedTests -eq $totalTests) { 'Green' } else { 'Yellow' })

if ($passedTests -eq $totalTests) {
    Write-Host "🎉 All core tests passed! Your SEO setup looks good." -ForegroundColor Green
} else {
    Write-Host "⚠️  Some tests failed. Please check the issues above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Submit sitemap to Google Search Console: $BaseUrl/sitemap.xml"
Write-Host "2. Monitor for any crawling errors"
Write-Host "3. Check individual page URLs for proper metadata"
Write-Host "4. Test page load speeds with Google PageSpeed Insights"
