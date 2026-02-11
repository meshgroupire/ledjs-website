# Image Update Guide

## Quick Reference for Updating Service Images

### Image Location
All service images should be placed in: `public/images/services/`

### Required Images
- `wedding-djs.jpg` - Wedding DJ service image
- `party-djs.jpg` - Party DJ service image  
- `led-wristbands.jpg` - LED Wristband service image
- `speed-quizzing.jpg` - Speed Quizzing service image
- `music-bingo.jpg` - Music Bingo service image
- `karaoke.jpg` - Karaoke service image

### Image Specifications
- **Format**: JPG or PNG
- **Dimensions**: 800x500px or 1200x600px (rectangular/landscape format recommended)
- **File Size**: Optimize images to keep file sizes reasonable (under 500KB each)

### How to Update Images

#### Method 1: Simple File Replacement (Easiest)
1. Take your new image
2. Rename it to match the service filename (e.g., `wedding-djs.jpg`)
3. Replace the existing file in `public/images/services/` folder
4. The website will automatically use the new image!

#### Method 2: Change Image Filename
1. Add your new image to `public/images/services/` folder
2. Open `src/config/services.js`
3. Find the service you want to update
4. Change the `image` property (e.g., from `'/images/services/wedding-djs.jpg'` to `'/images/services/my-new-wedding-image.jpg'`)

### Example Update

```javascript
// In src/config/services.js
{
  id: 'wedding-djs',
  // ... other properties
  image: '/images/services/wedding-djs.jpg', // Change this to your new filename
}
```

### Image Placeholders
If an image doesn't exist yet, a gradient placeholder will automatically appear. No broken images will show on the website.

### Tips
- Use descriptive filenames: `wedding-djs-2024.jpg` if you want to keep multiple versions
- Optimize images before uploading (use tools like TinyPNG or ImageOptim)
- Keep images consistent in style and quality
- Test images on both desktop and mobile views
