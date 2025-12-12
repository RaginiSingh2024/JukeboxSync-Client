// Server configuration
const PRODUCTION_URL = 'https://jukeboxsync-server.onrender.com';

// Ensure we're using the correct URLs based on environment
const getApiUrl = () => {
  // In production, always use the production URL
  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_URL;
  }
  // In development, use the environment variable or fallback to production
  return process.env.REACT_APP_API_URL || PRODUCTION_URL;
};

const API_URL = getApiUrl();
const BASE_URL = API_URL;
const SOCKET_URL = API_URL;

export { API_URL, BASE_URL, SOCKET_URL };