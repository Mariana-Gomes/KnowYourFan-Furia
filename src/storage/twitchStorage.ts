import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { StreammerDTO } from "../dtos/StreammerDTO";

export const saveTwitchStreammers = async (
  uid: string,
  streammers: StreammerDTO[]
) => {
  try {
    const twitchRef = doc(db, "twitch", uid);
    await setDoc(twitchRef, { streammers });
  } catch (error) {
    console.log(error);
  }
};

export const getTwitchStreammers = async (uid: string) => {
  try {
    const twitchRef = doc(db, "twitch", uid);
    const docSnap = await getDoc(twitchRef);

    if (docSnap.exists()) {
      return docSnap.data().streammers || [];
    } else {
      console.log("Documento não encontrado!");
      return [];
    }
  } catch (error) {
    console.log("Erro ao buscar streammers:", error);
    return [];
  }
};
