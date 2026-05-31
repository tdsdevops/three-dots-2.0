/**
 * Instagram Basic Display API Service
 * 
 * Fetches media from the official Instagram API.
 * Requires an active long-lived access token.
 */

const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const IG_API_URL = "https://graph.instagram.com/me/media";

export async function fetchInstagramReels() {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.warn("Instagram Access Token is missing. Falling back to mock data.");
    return null;
  }

  try {
    const url = new URL(IG_API_URL);
    url.searchParams.append("fields", "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp");
    url.searchParams.append("access_token", INSTAGRAM_ACCESS_TOKEN);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Filter to only return VIDEO/REELS or sort them, and map them to our schema
    const posts = data.data || [];
    
    // We filter for videos/reels if needed, but since Instagram sometimes categorizes reels as VIDEO
    const reels = posts.filter(post => post.media_type === "VIDEO" || post.media_type === "CAROUSEL_ALBUM");

    // Fallback: If no videos are found, just return all posts as reels mapping
    const displayPosts = reels.length > 0 ? reels : posts;

    // Map the official Instagram data schema to the one expected by ReelCard
    return displayPosts.slice(0, 6).map((post, index) => ({
      id: post.id,
      // If it's a video, use media_url. If it's an image, use media_url for the thumbnail.
      // Because we want to show reels, we rely on media_url having the mp4 link for VIDEO types.
      videoUrl: post.media_type === "VIDEO" ? post.media_url : post.media_url, 
      thumbnailUrl: post.thumbnail_url || post.media_url,
      permalink: post.permalink,
      likes: "—", // Instagram Basic Display API does not return likes or comments due to privacy
      comments: "—",
      caption: post.caption || "",
      audio: "Original Audio", // Audio info isn't provided by this basic endpoint
      timestamp: post.timestamp
    }));

  } catch (error) {
    console.error("Failed to fetch Instagram reels:", error);
    return null;
  }
}
