import { useState } from "react";
import { PencilLine } from "@phosphor-icons/react";
import { saveProfile } from "../storage/userStorage";
import { User } from "@phosphor-icons/react";

import { useAuth } from "../hooks/useAuth";
import { MAX_SIZE_BYTES, MAX_SIZE_MB } from "../constants";

export function CardEdit() {
  const { user, updateUserData, showToast } = useAuth();

  const [coverImage, setCoverImage] = useState(user?.coverImage ?? "");
  const [avatarImage, setAvatarImage] = useState(user?.avatarImage ?? "");
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");

  const hasCoverImage = !!coverImage;
  const hasAvatarImage = !!avatarImage;

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      showToast(`A imagem deve ter no máximo ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setCoverImage(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      showToast(`A imagem deve ter no máximo ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setAvatarImage(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    try {
      if (!user) return;

      saveProfile(user.uid, coverImage, avatarImage, name, bio);
      updateUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="bg-[#252525] overflow-hidden rounded-2xl">
      <label className="cursor-pointer relative block">
        <input type="file" className="hidden" onChange={handleCoverChange} />
        {hasCoverImage ? (
          <img
            className="w-full h-[150px] object-cover"
            src={coverImage}
            alt="Foto de capa"
          />
        ) : (
          <div className="w-full h-[150px] object-cover bg-[#525151]" />
        )}

        <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 hover:bg-blue-700">
          <PencilLine size={16} color="#fff" />
        </div>
      </label>

      <div className="flex flex-col items-center -mt-[30px]">
        <label className="cursor-pointer relative">
          <input type="file" className="hidden" onChange={handleAvatarChange} />
          {hasAvatarImage ? (
            <img
              src={avatarImage}
              className="w-40 h-40 rounded-lg 
            border-4 border-gray-800 outline-2 outline-blue-500 object-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-[#252525] w-40 h-40 rounded-lg border-4 border-gray-800 outline-2 outline-blue-500 object-cover">
              <User size={100} color="#fff" />
            </div>
          )}

          <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 hover:bg-blue-700">
            <PencilLine size={14} color="#fff" />
          </div>
        </label>
      </div>
      <div className="p-10">
        <div className="flex flex-col ">
          <label className="text-left text-white/50 leading-relaxed font-bold outline-none col-auto">
            Nome
          </label>
          <input
            className="bg-transparent text-left text-gray-100 leading-relaxed  outline-none border-b border-gray-600 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-col">
          <label className="text-left text-white/50 leading-relaxed font-bold outline-none col-auto">
            Bio
          </label>
          <textarea
            className="bg-transparent text-left text-gray-100 leading-relaxed outline-none border-b border-gray-600 w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={1}
          />
        </div>
      </div>

      <footer className="px-8 pb-8 items-center flex justify-center">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500  hover:bg-blue-600 text-white rounded-lg h-[50px] px-6 font-bold w-50 flex items-center justify-center gap-2 transition-colors duration-100 cursor-pointer"
        >
          Salvar alterações
        </button>
      </footer>
    </aside>
  );
}
