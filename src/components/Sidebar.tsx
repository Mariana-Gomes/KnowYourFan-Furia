import {
  PencilLine,
  SealCheck,
  SignOut,
  TwitchLogo,
} from "@phosphor-icons/react";
import { Warning, CheckCircle } from "@phosphor-icons/react";
import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Sidebar() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const hasCoverImage = !!user?.coverImage;

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <aside className={"bg-[#252525] overflow-hidden rounded-2xl"}>
      {hasCoverImage ? (
        <img className={"w-full h-[72px] object-cover"} src={user.coverImage} />
      ) : (
        <div className="w-full h-[72px] object-cover bg-[#525151]" />
      )}
      <div className={"flex flex-col items-center -mt-[30px]"}>
        <Avatar src={user?.avatarImage} />
        <div className="flex flex-row mt-4">
          <p className="text-white font-bold">{user?.name}</p>

          {user.documentVerified && (
            <div className="relative group">
              <SealCheck size={20} className="text-blue-500 ml-1" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex px-3 py-1 bg-blue-700 text-white font-bold text-xs rounded shadow-lg z-10 whitespace-nowrap">
                Fã oficial FURIA
              </span>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-400 leading-relaxed">
          {user.bio}
        </span>
        <button
          className={`flex flex-row p-2 rounded  ${
            user?.isRegisterCompleted
              ? "text-green-600/70 hover:text-green-600"
              : "text-amber-600/70 hover:text-amber-600"
          } cursor-pointer`}
          onClick={() => navigate("/profile")}
        >
          {user?.isRegisterCompleted ? (
            <>
              <CheckCircle size={20} />
              <p className="text-sm ml-2">Cadastro completo</p>
            </>
          ) : (
            <>
              <Warning size={20} />
              <p className="text-sm ml-2">Cadastro pendente</p>
            </>
          )}
        </button>
      </div>
      <footer className="border-t border-gray-600 mt-6 px-8 pt-6 pb-8">
        <a
          onClick={() => navigate("/editProfile")}
          className="bg-transparent text-blue-500 border text-[14px] cursor-pointer border-blue-500 rounded-lg h-[50px] px-6 font-bold flex items-center justify-center gap-2 transition-colors duration-100 no-underline hover:bg-blue-500 hover:text-white"
        >
          <PencilLine size={20} />
          Editar seu perfil
        </a>

        <a
          onClick={() => navigate("/creators")}
          className="bg-transparent mt-4 text-purple-500 border text-[14px] cursor-pointer border-purple-500 rounded-lg h-[50px] px-6 font-bold flex items-center justify-center gap-2 transition-colors duration-100 no-underline hover:bg-purple-500 hover:text-white"
        >
          <TwitchLogo size={20} />
          Criadores
        </a>

        <a
          onClick={handleLogout}
          className="bg-transparent mt-4 text-red-600 border text-[14px] cursor-pointer border-red-600 rounded-lg h-[50px] px-6 font-bold flex items-center justify-center gap-2 transition-colors duration-100 no-underline hover:bg-red-600 hover:text-white"
        >
          <SignOut size={20} />
          Sair
        </a>
      </footer>
    </aside>
  );
}
