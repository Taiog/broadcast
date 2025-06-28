import { useState } from "react";
import { registerWithEmail } from "../services/auth";
import { FirebaseError } from "firebase/app";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      await registerWithEmail(email, password);
      return { success: true };
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setError(firebaseError.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    loading,
    error,
  };
}
