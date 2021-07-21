import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextProviderprops = {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContentxType {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}



export const AuthContentx = createContext({} as AuthContentxType);

export function AuthContextProvider(props : AuthContextProviderprops) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error("missing information from google account.");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("missing information from google account.");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContentx.Provider value={{ user, signInWithGoogle }}>
     {props.children}
    </AuthContentx.Provider>
  );
}
