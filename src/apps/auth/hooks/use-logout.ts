import { useState } from "react";
import { logoutUser } from "../../../services/auth";
import { FirebaseError } from "firebase/app";

export function useLogout() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function logout() {
    setLoading(true);
    setError(null);

    try {
      await logoutUser();

      return { success: true };
    } catch (err) {
      const firebaseError = err as FirebaseError;

      setError(firebaseError.message);

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { logout, loading, error };
}
