# PWA Icons Placeholder

This directory should contain PWA icons in the following sizes:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## How to Generate Icons

### Option 1: Use Online Tool (Easiest)
1. Go to [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload your logo/icon (512x512 recommended)
3. Download the generated icons
4. Place them in this directory

### Option 2: Use PWA Asset Generator
```bash
npm install -g pwa-asset-generator

# Generate from a single source image
pwa-asset-generator logo.png ./public/icons
```

### Option 3: Manual Creation
Create icons manually in the sizes listed above using:
- Photoshop
- Figma
- Canva
- GIMP (free)

## Temporary Solution

For development, you can use a simple colored square or placeholder until you have a proper logo.

## Icon Requirements

- **Format**: PNG with transparency
- **Background**: Can be transparent or solid color
- **Design**: Simple, recognizable at small sizes
- **Maskable**: Should work with Android's adaptive icons
- **Theme**: Match your app's branding

## Current Status

⚠️ **TODO**: Add actual PWA icons before production deployment
