/**
 * Helper script to extract Google Maps images from place listings
 * 
 * Usage:
 * 1. Open Google Maps in your browser
 * 2. Navigate to the place you want images for
 * 3. Open browser DevTools (F12)
 * 4. Go to Console tab
 * 5. Copy and paste this script
 * 6. Run: extractGoogleMapsImages()
 * 
 * The script will extract image URLs from the current Google Maps page
 */

function extractGoogleMapsImages() {
  const images = [];
  
  // Try to find images in various locations on the page
  // Method 1: Look for img tags with Google image domains
  const imgElements = document.querySelectorAll('img[src*="googleusercontent.com"], img[src*="googleapis.com"]');
  
  imgElements.forEach(img => {
    const src = img.src || img.getAttribute('src');
    if (src && (src.includes('googleusercontent.com') || src.includes('googleapis.com'))) {
      // Clean up the URL - remove size parameters if present
      const cleanUrl = src.split('=')[0].split('?')[0];
      if (cleanUrl && !images.includes(cleanUrl)) {
        images.push(cleanUrl);
      }
    }
  });
  
  // Method 2: Look for image data in JSON-LD or other data attributes
  const scriptTags = document.querySelectorAll('script[type="application/ld+json"]');
  scriptTags.forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      if (data.image && typeof data.image === 'string') {
        if (!images.includes(data.image)) {
          images.push(data.image);
        }
      }
      if (Array.isArray(data.image)) {
        data.image.forEach(img => {
          if (typeof img === 'string' && !images.includes(img)) {
            images.push(img);
          }
        });
      }
    } catch (e) {
      // Skip invalid JSON
    }
  });
  
  // Method 3: Look for images in photo galleries
  const photoButtons = document.querySelectorAll('[data-photo-index], [jsaction*="photo"]');
  photoButtons.forEach(btn => {
    const style = btn.getAttribute('style');
    if (style && style.includes('url(')) {
      const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        const url = urlMatch[1];
        if ((url.includes('googleusercontent.com') || url.includes('googleapis.com')) && !images.includes(url)) {
          images.push(url);
        }
      }
    }
  });
  
  // Clean and deduplicate URLs
  const uniqueImages = [...new Set(images)]
    .filter(url => url && url.length > 10)
    .map(url => {
      // Ensure full URL
      if (url.startsWith('//')) {
        return 'https:' + url;
      }
      if (url.startsWith('/')) {
        return 'https://maps.googleapis.com' + url;
      }
      return url;
    });
  
  console.log('Found', uniqueImages.length, 'images:');
  uniqueImages.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  // Copy to clipboard as array format
  const arrayFormat = `[\n${uniqueImages.map(url => `  '${url}',`).join('\n')}\n]`;
  console.log('\nArray format (copy this):');
  console.log(arrayFormat);
  
  // Try to copy to clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(arrayFormat).then(() => {
      console.log('\n✅ Copied to clipboard!');
    }).catch(() => {
      console.log('\n❌ Could not copy to clipboard automatically');
    });
  }
  
  return uniqueImages;
}

// Alternative: Manual extraction instructions
console.log(`
📸 Google Maps Image Extractor
================================

Option 1: Automated (run extractGoogleMapsImages())
- Open the Google Maps listing
- Open DevTools Console
- Run: extractGoogleMapsImages()

Option 2: Manual Extraction
1. Open Google Maps listing
2. Scroll to photos section
3. Click on a photo to open full view
4. Right-click image → "Inspect Element"
5. In DevTools, find the <img> tag
6. Copy the src URL (usually from lh3.googleusercontent.com)
7. Repeat for each photo

Option 3: Using Network Tab
1. Open DevTools → Network tab
2. Filter by "Img"
3. Navigate through photos on the page
4. Copy image URLs from Network requests
5. Look for URLs from googleusercontent.com or googleapis.com
`);

// Export function
window.extractGoogleMapsImages = extractGoogleMapsImages;

