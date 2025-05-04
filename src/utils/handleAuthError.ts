import { FirebaseError } from "firebase/app";

export const handleAuthError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/email-already-in-use":
        return "Este e-mail já está em uso.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente.";
    }
  }

  return "Erro desconhecido.";
};
