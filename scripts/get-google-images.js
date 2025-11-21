/**
 * Script to help extract Google Maps images
 * 
 * This script provides helper functions to extract image URLs from Google Maps
 * Since Google Maps images require browser context, this provides instructions
 * and can format the data once you have the URLs
 */

const fs = require('fs');
const path = require('path');

/**
 * Helper function to format image URLs into the activity data structure
 */
function formatImagesForActivity(activityName, imageUrls) {
  const formatted = imageUrls.map(url => `    '${url}',`).join('\n');
  return `{\n  name: '${activityName}',\n  images: [\n${formatted}\n  ],\n}`;
}

/**
 * Read current activities file and prepare for updates
 */
function prepareActivityUpdate(activityName, imageUrls) {
  const pagePath = path.join(__dirname, '../app/things-to-do/page.tsx');
  const content = fs.readFileSync(pagePath, 'utf8');
  
  // Find the activity in the file
  const activityRegex = new RegExp(`(name:\\s*'${activityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'.*?)(images:\\s*\\[.*?\\],)`, 's');
  
  if (activityRegex.test(content)) {
    const formattedImages = imageUrls.map(url => `'${url}'`).join(',\n        ');
    const replacement = `$1images: [\n          ${formattedImages}\n        ],`;
    const updated = content.replace(activityRegex, replacement);
    return updated;
  }
  
  return null;
}

console.log(`
📸 Google Maps Image Extractor Helper
=====================================

Since Google Maps images require browser context, here are your options:

OPTION 1: Browser Console Script (Recommended)
-----------------------------------------------
1. Open Google Maps in your browser
2. Navigate to the place (e.g., "Plaza Mayor Villa de Leyva")
3. Open DevTools (F12) → Console tab
4. Copy and paste the content of: scripts/fetch-google-maps-images.js
5. Run: extractGoogleMapsImages()
6. Copy the output array and use it below

OPTION 2: Manual Extraction
----------------------------
1. Visit Google Maps listing
2. Click on photos section
3. Right-click each photo → "Copy Image Address"
4. Collect the URLs (they look like: lh3.googleusercontent.com/p/...)

OPTION 3: Use the format helper
--------------------------------
If you have image URLs, use this format:

${formatImagesForActivity('Plaza Mayor', [
  'https://lh3.googleusercontent.com/p/AF1Qip...',
  'https://lh3.googleusercontent.com/p/AF1Qip...',
])}

Then update the activities in app/things-to-do/page.tsx
`);

// Export helper function
if (typeof module !== 'undefined') {
  module.exports = {
    formatImagesForActivity,
    prepareActivityUpdate,
  };
}

