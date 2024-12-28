const API_KEY = "AIzaSyChiAtZGZjsrNg8j6kd3tmuy28KJHWkif8";

export const YouTube_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&&maxResults=50&key=${API_KEY}`;

export const YOUTUBE_SEARCH_API ="http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";