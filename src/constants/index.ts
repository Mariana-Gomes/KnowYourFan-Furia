import { PostType } from "../components/Post";

export const furiaStreammersList = [
  "gafallen",
  "paulanobre",
  "sofiaespanha",
  "kscerato",
  "furiatv",
  "yuurih",
  "brino",
  "mount",
  "otsukaxd",
  "kheyze7",
  "xarola_",
  "pokizgames",
];

export const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl:
        "https://yt3.googleusercontent.com/_QDHD8FYiV_Xhk4pdtzme9OOtbg6LMCOcSz3-Sv0AVUbSccWbtQJlIbk2sIEiBbQsIgwn64onQ=s900-c-k-c0x00ffffff-no-rj",
      name: "FURIA",
      role: "Perfil Oficial",
    },
    content: [
      { type: "paragraph", content: "E AÍ PANTERASSSSSS!" },
      {
        type: "paragraph",
        content:
          "Estão vendo o jogo da Furia? TO SURTANTO AQUI!!! VAI FURIAAAAAAAA 🚀",
      },
      {
        type: "image",
        content: "https://media.tenor.com/cU58zVer0swAAAAM/oi-brazil.gif",
      },
    ],
    comments: [
      {
        id: 1,
        content: "#VAIFURIA",
        author: "Pedro",
        avatarUrl:
          "https://avatars.cloudflare.steamstatic.com/68996c4eff2d0ba6e0a3417657de0871368a46cd_full.jpg",
        isUser: false,
      },
    ],
    publishedAt: new Date("2025-05-03 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://yt3.googleusercontent.com/leQUlrkoY_SOgw-hDKUDj92M1atv5b_33EwHMthRCP3EZYYQEDAy_NxmWmXNqSWkMniom9F_Yuo=s900-c-k-c0x00ffffff-no-rj",
      name: "Brino",
      role: "Influencer",
    },
    content: [
      { type: "paragraph", content: "Mano.. esse jogo!" },
      {
        type: "paragraph",
        content: "Cês viram essa essa jogada agora do Fallen? Queeeer ota? 🔫",
      },
      {
        type: "link",
        content: "",
      },
    ],
    comments: [
      {
        id: 1,
        content: "Que jogão!!",
        author: "João",
        avatarUrl:
          "https://i.pinimg.com/736x/65/79/aa/6579aaaedde20287d08c896dbc8a2969.jpg",
        isUser: false,
      },
    ],
    publishedAt: new Date("2025-05-03 20:00:00"),
  },
];

export const months = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export const MAX_SIZE_MB = 1;
export const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
