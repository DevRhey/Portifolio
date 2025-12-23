import sys
import subprocess
import os

try:
    from PIL import Image
except Exception:
    print('Pillow not found, installing...')
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    try:
        from PIL import Image
    except Exception as e:
        print('Failed to import Pillow after install:', e)
        sys.exit(1)

SRC = os.path.join('..', 'assets', 'img', 'perfil.jpg')
if not os.path.exists(SRC):
    print('Source image not found:', SRC)
    sys.exit(1)

sizes = [(480, 'perfil-480'), (240, 'perfil-240'), (120, 'perfil-120')]

try:
    img = Image.open(SRC).convert('RGBA')
except Exception as e:
    print('Failed to open source image:', e)
    sys.exit(1)

# Save full webp
try:
    out_dir = os.path.join('..','assets','img')
    out_webp = os.path.join(out_dir, 'perfil.webp')
    img.save(out_webp, 'WEBP', quality=85)
    print('Saved', out_webp)
except Exception as e:
            print('Failed to save perfil.webp:', e)
for w, name in sizes:
    try:
        im = img.resize((w, w), Image.LANCZOS)
        im_rgb = im.convert('RGB')
        webp_name = os.path.join(out_dir, f'{name}.webp')
        jpg_name = os.path.join(out_dir, f'{name}.jpg')
        try:
            im_rgb.save(webp_name, 'WEBP', quality=80)
            print('Saved', webp_name)
        except Exception as e:
            print('Failed to save', webp_name, e)
        try:
            im_rgb.save(jpg_name, 'JPEG', quality=85, optimize=True)
            print('Saved', jpg_name)
        except Exception as e:
            print('Failed to save', jpg_name, e)
    except Exception as e:
        print('Resize failed for', name, e)

# Generate favicon.ico from perfil 64x64
try:
    ico = img.resize((64, 64), Image.LANCZOS).convert('RGBA')
    ico_path = os.path.join('..','assets','icons','favicon.ico')
    ico.save(ico_path, format='ICO', sizes=[(64, 64)])
    print('Saved', ico_path)
except Exception as e:
    print('Failed to generate favicon.ico:', e)

print('Done')
