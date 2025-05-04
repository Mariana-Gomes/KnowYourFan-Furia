import "../App.css";
import { useCallback, useEffect, useRef, useState } from "react";

import { Header } from "../components/Header";

import { useTwitchAuth } from "../hooks/useTwitchAuth";
import { getTwitchStreammers } from "../storage/twitchStorage";
import { useAuth } from "../hooks/useAuth";
import { ArrowsClockwise, Check, TwitchLogo } from "@phosphor-icons/react";

import {
  checkFollowedStreammers,
  getTwitchUserId,
  handleFollowStreammer,
  handleTwitchAuthorization,
} from "../services/twitchService";
import { StreammerDTO } from "../dtos/StreammerDTO";
import { Loading } from "../components/Loading";
import { MiniLoading } from "../components/MiniLoading";

export function Creators() {
  const [twitchUserId, setTwitchUserId] = useState<number | null>(null);
  const [twitchUserFollows, setTwitchUserFollows] = useState<StreammerDTO[]>(
    []
  );

  const [isLoadingTwitchData, setIsLoadingTwitchData] = useState(false);
  const [isCheckingFollows, setIsCheckingFollows] = useState(false);

  const { user } = useAuth();
  const accessToken = useTwitchAuth();

  const getStreammers = useCallback(async () => {
    setIsLoadingTwitchData(true);
    const streammers = await getTwitchStreammers(user.uid);
    setTwitchUserFollows(streammers);

    setIsLoadingTwitchData(false);
  }, [user.uid]);

  const getTwitchUser = useCallback(async () => {
    const twitchUser = await getTwitchUserId(user.uid, accessToken as string);
    setTwitchUserId(twitchUser);
  }, [user, accessToken]);

  const checkFollowers = useCallback(async () => {
    setIsCheckingFollows(true);

    const follows = await checkFollowedStreammers(
      user.uid,
      twitchUserId as number,
      setIsLoadingTwitchData
    );

    setTwitchUserFollows(follows);
    setIsCheckingFollows(false);
  }, [twitchUserId, user]);

  useEffect(() => {
    if (user.uid) getStreammers();
  }, [user, getStreammers]);

  useEffect(() => {
    if (accessToken) getTwitchUser();
  }, [accessToken, getTwitchUser]);

  useEffect(() => {
    if (twitchUserId) checkFollowers();
  }, [twitchUserId, checkFollowers]);

  if (isLoadingTwitchData) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Header />
      </div>

      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] my-8 max-md:p-4">
        <div className="max-w-xl w-full rounded-2xl bg-[#252525] p-10">
          <div className="">
            <div className="flex items-start justify-between my-8">
              <div>
                <h1 className="text-left font-bold text-3xl text-white mb-4">
                  Criadores
                </h1>
                <p className="text-left text-base text-white mb-8">
                  Entre com a sua Twitch para ver a lista completa dos streamers
                  oficiais da FURIA e conferir quais que você segue!
                </p>
                <div className="border-1 border-b-white/70" />
              </div>

              <button
                className="bg-blue-500 p-2 rounded hover:bg-blue-700 cursor-pointer h-fit"
                onClick={handleTwitchAuthorization}
              >
                <ArrowsClockwise size={25} className="text-white" />
              </button>
            </div>
          </div>

          {!twitchUserFollows.length ? (
            <button
              onClick={handleTwitchAuthorization}
              className="bg-purple-500 hover:bg-purple-700 cursor-pointer h-fit flex flex-row w-60 p-3 rounded items-center justify-center"
            >
              <TwitchLogo size={25} className="text-white mr-2" />
              <p className="text-white">Entrar com a Twitch</p>
            </button>
          ) : (
            <div className="flex flex-row gap-8 flex-wrap">
              {twitchUserFollows.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center flex-1 min-w-24"
                >
                  <img
                    src={item.image}
                    className="w-16 rounded-full border-1 border-purple-500"
                  />
                  <p className="text-white font-bold text-sm mt-2">
                    {item.name}
                  </p>
                  {isCheckingFollows ? (
                    <MiniLoading />
                  ) : item.isFollowed ? (
                    <div className="flex flex-row items-center mt-2">
                      <Check size={16} className="text-purple-500" />
                      <span className="w-full text-purple-500 text-xs p-1">
                        Seguindo
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleFollowStreammer(item.name);
                      }}
                      className="w-full text-white bg-purple-500 text-xs mt-2 p-1 rounded cursor-pointer hover:bg-purple-700 hover:text-white"
                    >
                      Seguir
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
