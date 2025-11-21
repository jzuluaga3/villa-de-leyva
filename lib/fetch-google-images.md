# How to Get Google Maps Images

## Quick Method (Browser Console Script)

1. Open Google Maps in your browser
2. Navigate to the place listing (e.g., "Plaza Mayor Villa de Leyva")
3. Open Developer Tools (F12 or right-click → Inspect)
4. Go to the **Console** tab
5. Copy the entire content of `scripts/fetch-google-maps-images.js`
6. Paste it in the console and press Enter
7. Run: `extractGoogleMapsImages()`
8. The script will display image URLs and try to copy them to your clipboard

## Manual Method

1. Visit the Google Maps listing
2. Scroll down to the "Photos" section
3. Click on any photo to open it in full view
4. Right-click the large photo → "Copy Image Address"
5. The URL will look like: `https://lh3.googleusercontent.com/p/...`
6. Copy multiple image URLs this way
7. Add them to the `images` array in `app/things-to-do/page.tsx`

## Example

After getting the URLs, update the activity like this:

```typescript
{
  name: 'Plaza Mayor',
  images: [
    'https://lh3.googleusercontent.com/p/AF1Qip...',
    'https://lh3.googleusercontent.com/p/AF1Qip...',
    'https://lh3.googleusercontent.com/p/AF1Qip...',
  ],
}
```

## Notes

- Google Maps images may expire after some time
- Consider saving images locally in `public/` folder for permanent storage
- The URLs are typically very long - make sure to copy the full URL
- Some images may require authentication, so test them after adding

