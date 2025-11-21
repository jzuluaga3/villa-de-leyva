# Automated Google Maps Image Extraction

I cannot directly run browser scripts, but here's the best automated approach:

## Option 1: Use Google Places API (Requires API Key)

If you have a Google Places API key, I can create a script that automatically fetches images. This requires:
1. Google Cloud account
2. Places API enabled
3. API key

Let me know if you have this and I'll create the script!

## Option 2: Browser Extension Method

I can create a simple browser extension that extracts images with one click. Would you like me to create this?

## Option 3: Manual but Faster

1. Open this page in your browser: https://www.google.com/maps/search/Plaza+Mayor+Villa+de+Leyva
2. Open DevTools (F12) → Console
3. Paste and run this code:

```javascript
// Quick image extractor for current Google Maps page
const extractImages = () => {
  const images = new Set();
  
  // Get all images from the page
  document.querySelectorAll('img').forEach(img => {
    const src = img.src || img.getAttribute('src');
    if (src && (src.includes('googleusercontent.com') || src.includes('googleapis.com'))) {
      // Get full resolution URL
      let url = src;
      // Remove size parameters to get original
      url = url.split('=w')[0].split('=h')[0].split('?')[0];
      if (url.length > 50) { // Filter out small icons
        images.add(url);
      }
    }
  });
  
  // Look in photo carousel if available
  const photoButtons = document.querySelectorAll('[data-photo-index], [aria-label*="photo"]');
  photoButtons.forEach(btn => {
    const img = btn.querySelector('img');
    if (img && img.src) {
      let url = img.src.split('=w')[0].split('=h')[0].split('?')[0];
      if (url.includes('googleusercontent.com') && url.length > 50) {
        images.add(url);
      }
    }
  });
  
  const imageArray = Array.from(images);
  console.log(`Found ${imageArray.length} images:`);
  imageArray.forEach((url, i) => console.log(`${i + 1}. ${url}`));
  
  const formatted = `[\n${imageArray.map(url => `  '${url}',`).join('\n')}\n]`;
  console.log('\n📋 Copy this array:\n');
  console.log(formatted);
  
  // Try to copy to clipboard
  navigator.clipboard?.writeText(formatted).then(() => {
    console.log('\n✅ Copied to clipboard!');
  });
  
  return imageArray;
};

extractImages();
```

## Option 4: I can search for publicly available images

Would you like me to search the web for publicly available images of these locations and provide URLs that work?

