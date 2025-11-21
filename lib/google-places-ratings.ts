/**
 * Google Places API Rating Fetcher
 * 
 * To enable dynamic ratings:
 * 1. Get a Google Places API key from https://console.cloud.google.com/
 * 2. Add it to .env.local as NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
 * 3. Add Place IDs to your restaurant/activity data
 * 4. Uncomment and use the fetchPlaceRating function
 */

export interface PlaceRating {
  rating: number;
  reviewCount: number;
}

/**
 * Fetches rating from Google Places API using Place ID
 * Requires: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in .env.local
 */
export async function fetchPlaceRating(placeId: string): Promise<PlaceRating | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.warn('Google Places API key not found. Using static ratings.');
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      return {
        rating: data.result.rating || 0,
        reviewCount: data.result.user_ratings_total || 0,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching place rating:', error);
    return null;
  }
}

/**
 * Fetches Place ID using text search
 * This requires two API calls: first search, then details
 */
export async function fetchPlaceIdFromQuery(query: string): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  try {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status === 'OK' && searchData.results && searchData.results.length > 0) {
      return searchData.results[0].place_id;
    }

    return null;
  } catch (error) {
    console.error('Error fetching place ID:', error);
    return null;
  }
}

