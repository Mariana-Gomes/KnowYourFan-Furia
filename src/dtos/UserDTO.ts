import { Timestamp } from "firebase/firestore";

export type UserDTO = {
  uid: string;
  name: string;
  email: string;
  bio: string;
  birthDate: Timestamp;
  phone: string;
  cpf: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  furiaTeams: string[];
  furiaProducts: string[];
  coverImage: string;
  avatarImage: string;
  isRegisterCompleted: boolean;
  documentVerified: boolean;
  twitchUsername: string;
};
