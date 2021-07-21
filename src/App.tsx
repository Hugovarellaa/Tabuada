import { createContext, useState } from "react";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";
import firebase from "firebase";
import { auth } from "./services/firebase";

export const AuthContentx = createContext({} as AuthContentxType);

interface User {
  id: string;
  name: string;
  avatar: string;
}

type AuthContentxType = {
  user: User | undefined;
  signInWithGoogle: ()=>void;
}

export function App() {
  const [user, setUser] = useState<User>();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then((result) => {
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
    });
  } 
  return (
    <BrowserRouter>
      <AuthContentx.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact={true} component={Home}  />
        <Route path="/rooms/news" component={NewRoom} />
      </AuthContentx.Provider>
    </BrowserRouter>
  );
}
