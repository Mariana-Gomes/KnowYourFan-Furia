import "../App.css";

import { Header } from "../components/Header";
import { CardEdit } from "../components/CardEdit";

export function EditProfile() {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Header />
      </div>

      <div className="items-center my-10">
        <h1 className="text-center font-bold text-3xl text-white">
          Editar perfil
        </h1>
      </div>

      <div className="flex justify-center items-center mb-8 max-md:p-4">
        <div className="flex flex-col gap-4 max-w-xl w-full rounded-2xl bg-[#252525]">
          <CardEdit />
        </div>
      </div>
    </>
  );
}
