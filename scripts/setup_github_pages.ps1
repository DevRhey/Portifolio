param(
  [Parameter(Mandatory=$false)][string]$Username,
  [Parameter(Mandatory=$false)][string]$RepoName,
  [switch]$UserSite,
  [Parameter(Mandatory=$false)][string]$CustomDomain
)

# Resolve working directory
$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $ProjectDir

function Ensure-Command($name, $wingetId) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Host "Installing $name via winget..." -ForegroundColor Cyan
    try {
      winget install --id $wingetId -e --source winget -h
    } catch {
      Write-Warning "Failed to install $name automatically. Please install it manually and re-run."
      throw
    }
  }
}

# Ensure required tools
Ensure-Command git "Git.Git"
Ensure-Command gh "GitHub.cli"

# GitHub authentication
try {
  gh auth status | Out-Null
} catch {
  Write-Host "Authenticating with GitHub..." -ForegroundColor Cyan
  gh auth login
}

# Infer RepoName for user site
if ($UserSite -and [string]::IsNullOrWhiteSpace($RepoName)) {
  if ([string]::IsNullOrWhiteSpace($Username)) {
    Write-Error "For user site, provide -Username to compose <username>.github.io"
    exit 1
  }
  $RepoName = "$Username.github.io"
}

if ([string]::IsNullOrWhiteSpace($RepoName)) {
  Write-Error "Provide -RepoName or use -UserSite with -Username"
  exit 1
}

# Create CNAME if custom domain provided
if (-not [string]::IsNullOrWhiteSpace($CustomDomain)) {
  Set-Content -Path (Join-Path $ProjectDir 'CNAME') -Value $CustomDomain -NoNewline -Encoding ASCII
  Write-Host "CNAME created for domain: $CustomDomain" -ForegroundColor Green
}

# Ensure .nojekyll exists
$nojekyllPath = Join-Path $ProjectDir '.nojekyll'
if (-not (Test-Path $nojekyllPath)) { New-Item -ItemType File -Path $nojekyllPath | Out-Null }

# Initialize Git if needed
if (-not (Test-Path (Join-Path $ProjectDir '.git'))) {
  git init
  git branch -M main
}

# Add all and commit
git add .
if (-not (git rev-parse --verify HEAD 2>$null)) {
  git commit -m "Initial commit: portfolio + GitHub Pages setup"
} else {
  git commit -m "Update: GitHub Pages setup" -m "Workflow + .nojekyll + optional CNAME" 2>$null
}

# Determine visibility
$visibility = "--public"

# Create repo and push via gh if remote not set
$hasRemote = git remote get-url origin 2>$null
if (-not $hasRemote) {
  Write-Host "Creating GitHub repo: $RepoName" -ForegroundColor Cyan
  if ($UserSite) {
    gh repo create $RepoName $visibility --source . --remote origin --push
    Write-Host "User site created. It should be live at https://$RepoName/ shortly." -ForegroundColor Green
  } else {
    gh repo create $RepoName $visibility --source . --remote origin --push
    Write-Host "Project repo created and pushed. GitHub Actions will deploy Pages on push to main." -ForegroundColor Green
  }
} else {
  Write-Host "Remote exists. Pushing changes..." -ForegroundColor Cyan
  git push -u origin main
}

# Final hints
if ($UserSite) {
  Write-Host "Site URL: https://$RepoName/" -ForegroundColor Yellow
} else {
  Write-Host "Pages will deploy via Actions. Check 'Actions' tab in the repo." -ForegroundColor Yellow
}

if ($CustomDomain) {
  Write-Host "Configure DNS for $CustomDomain and enforce HTTPS in Pages settings." -ForegroundColor Yellow
}

Pop-Location
