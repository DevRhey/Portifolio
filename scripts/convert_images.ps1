# PowerShell script using ImageMagick (magick) to create resized JPG/WebP and favicon
# Run in project root (where assets/ exists)

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
  Write-Error "ImageMagick ('magick') not found in PATH. Install ImageMagick and open a new terminal."
  exit 1
}

$src = "assets\img\perfil.jpg"
if (-not (Test-Path $src)) { Write-Error "Source not found: $src"; exit 1 }

magick $src -resize 480x480^ -gravity center -extent 480x480 -strip -quality 85 "assets\img\perfil-480.jpg"
magick $src -resize 240x240^ -gravity center -extent 240x240 -strip -quality 85 "assets\img\perfil-240.jpg"
magick $src -resize 120x120^ -gravity center -extent 120x120 -strip -quality 85 "assets\img\perfil-120.jpg"

magick $src -strip -quality 85 -resize 800x800 "assets\img\perfil.webp"
magick $src -resize 480x480 -quality 80 "assets\img\perfil-480.webp"
magick $src -resize 240x240 -quality 80 "assets\img\perfil-240.webp"
magick $src -resize 120x120 -quality 80 "assets\img\perfil-120.webp"

magick assets\icons\favicon.svg -resize 64x64 assets\icons\favicon.ico

Write-Host "Done. Generated images in assets\img and favicon in assets\icons."