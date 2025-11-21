/**
 * Helper function to get Google Places photo URL
 * Note: This requires a Google Places API key and photo reference
 * For now, this is a placeholder structure for manual image URLs
 */

export function getGooglePlacesPhotoUrl(
  photoReference: string,
  apiKey?: string,
  maxWidth: number = 800
): string {
  if (!apiKey) {
    // Return a placeholder or empty string if no API key
    return '';
  }
  
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
}

/**
 * Helper to extract images from Google Maps listing
 * This would typically require Google Places API integration
 * For MVP, manual image URLs can be added directly to activity data
 */
export function getPlaceImages(placeName: string): string[] {
  // Placeholder - in production, this would query Google Places API
  // For now, return empty array - images should be manually added to activity data
  return [];
}

/**
 * Common image URLs structure for Villa de Leyva activities
 * These can be populated manually from Google Maps listings
 */
export const activityImageUrls: Record<string, string[]> = {
  // This will be populated with actual image URLs
  // Format: 'Activity Name': ['url1', 'url2', ...]
};

