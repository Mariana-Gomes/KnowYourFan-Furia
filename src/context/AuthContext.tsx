import { ReactNode, createContext, useEffect, useState } from "react";

import { logoutUser } from "../services/authService";
import { listenToAuthChanges } from "../storage/userStorage";

import type { UserDTO } from "../dtos/UserDTO";

interface AuthContextType {
  user: UserDTO;
  loading: boolean;
  logOut: () => Promise<void>;
  updateUserData: () => void;
  showToast: (message: string, isToastError?: boolean) => void;
  hideToast: () => void;
  message: string;
  shouldShowToast: boolean;
  isError: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const [isError, setIsError] = useState(true);

  const showToast = (message: string, isToastError?: boolean) => {
    setMessage(message);
    setIsError(isToastError ?? true);
    setShouldShowToast(true);
  };

  const hideToast = () => setShouldShowToast(false);

  const loadUserData = () => {
    setLoading(true);
    return listenToAuthChanges((userData) => {
      if (userData) {
        setUser(userData);
      }
      setLoading(false);
    });
  };

  const updateUserData = () => {
    loadUserData();
  };

  const logOut = async () => {
    setUser({} as UserDTO);
    await logoutUser();
  };

  useEffect(() => {
    const unsubscribe = loadUserData();

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logOut,
        updateUserData,
        showToast,
        hideToast,
        message,
        shouldShowToast,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
