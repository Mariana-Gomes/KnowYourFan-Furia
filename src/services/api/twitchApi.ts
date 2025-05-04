import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_TWITCH_API_BASE_URL,
  headers: {
    "Client-Id": import.meta.env.VITE_TWITCH_CLIENT_ID,
  },
});

export default api;
