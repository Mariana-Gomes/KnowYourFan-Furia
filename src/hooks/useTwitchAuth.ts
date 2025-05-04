import { useEffect, useState } from "react";

export const useTwitchAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      setAccessToken(token);
    }
  }, []);

  return accessToken;
};
