import furialogo from "../assets/logo-furia.svg";

export function Header() {
  return (
    <header className={"bg-white p-8 w-full flex items-center justify-center"}>
      <img src={furialogo} alt="Logotipo da Furia" />
      <div className="h-7 w-[1px] bg-black ml-5"></div>
      <p className="text-black font-bold ml-3 text-xl">Know Your Fan</p>
    </header>
  );
}
