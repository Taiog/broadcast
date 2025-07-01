import {
    onAuthStateChanged,
    type User as FirebaseUser,
} from "firebase/auth";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { auth } from "../services/firebase";

interface AuthContextType {
    user: FirebaseUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

function AuthContextProvider(props: PropsWithChildren) {
    const { children } = props
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
