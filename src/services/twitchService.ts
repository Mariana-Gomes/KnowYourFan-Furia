import api from "./api/twitchApi";

import { furiaStreammersList } from "../constants";

import { saveTwitchUsername } from "../storage/userStorage";
import { saveTwitchStreammers } from "../storage/twitchStorage";

const REDIRECT_URI = "https://localhost:5173/creators";
const SCOPES = "user:read:follows";

export const handleTwitchAuthorization = () => {
  const url = `https://id.twitch.tv/oauth2/authorize?client_id=${
    import.meta.env.VITE_TWITCH_CLIENT_ID
  }&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPES}`;

  window.location.href = url;
};

export const handleFollowStreammer = (streammerName: string) => {
  const url = `https://www.twitch.tv/${streammerName}`;
  window.open(url, "_blank");
};

export const getTwitchUserId = async (uid: string, accessToken: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await api.get("/users");

    const twitchUsername = response.data.data[0]?.display_name;
    if (twitchUsername) {
      await saveTwitchUsername(uid, twitchUsername);
    }

    return response.data.data[0].id;
  } catch (error) {
    console.log(error);
  }
};

export const checkFollowedStreammers = async (
  uid: string,
  twitchUserId: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const results = [];

  if (!twitchUserId) return [];
  setLoading(true);

  for (const streammerName of furiaStreammersList) {
    try {
      const userRes = await api.get(`/users?login=${streammerName}`);

      const streammerData = userRes.data.data[0];

      const streammerId = streammerData?.id;
      const streammerImage = streammerData?.profile_image_url;
      if (!streammerId) continue;

      const followRes = await api.get("/channels/followed", {
        params: {
          user_id: twitchUserId,
          broadcaster_id: streammerId,
        },
      });

      const isFollowed = !!followRes.data.data.length;
      results.push({
        id: streammerId,
        name: streammerName,
        image: streammerImage,
        isFollowed,
      });
    } catch (err) {
      console.warn(`Erro ao verificar follow para ${streammerName}:`, err);
    }
  }
  setLoading(false);

  await saveTwitchStreammers(uid, results);
  return results;
};
