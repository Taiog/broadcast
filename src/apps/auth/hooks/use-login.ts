import { useState } from "react";
import { loginWithEmail } from "../../../core/services/auth";
import { FirebaseError } from "firebase/app";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      await loginWithEmail(email, password);

      return { success: true };
    } catch (err) {
      const firebaseError = err as FirebaseError;

      setError(
        firebaseError.message.includes("invalid-credential")
          ? "Credenciais inválidas, tente novamente!"
          : firebaseError.message
      );

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}
