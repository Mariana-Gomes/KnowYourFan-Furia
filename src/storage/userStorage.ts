import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { RegisterFormData } from "../screens/register";
import { onAuthStateChanged } from "firebase/auth";
import { UserDTO } from "../dtos/UserDTO";

export const saveUserData = async (uid: string, data: RegisterFormData) => {
  try {
    const { name, email, birthDate } = data;
    const { day, month, year } = birthDate;

    const formattedBirthDate = new Date(+year, +month - 1, +day);

    const userRef = doc(db, "usuarios", uid);
    await setDoc(userRef, {
      name,
      email,
      birthDate: formattedBirthDate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const listenToAuthChanges = (
  callback: (userData: UserDTO | null) => void
) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const docRef = doc(db, "usuarios", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        callback({ uid: firebaseUser.uid, ...docSnap.data() } as UserDTO);
        return;
      }
    }
    callback(null);
  });
};

export const saveProfile = async (
  uid: string,
  coverImage: string,
  avatarImage: string,
  name: string,
  bio: string
) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    await updateDoc(userRef, {
      name,
      bio,
      coverImage,
      avatarImage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveTwitchUsername = async (
  uid: string,
  twitchUsername: string
) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    await updateDoc(userRef, {
      twitchUsername,
    });
  } catch (error) {
    console.log(error);
  }
};
