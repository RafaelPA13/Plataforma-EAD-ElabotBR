import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = async (name, email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      bio: "",
      isAdmin: false,
      isConsultant: false,
      isClient: false,
    });
    return user;
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  const sendResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const resetPassword = async (oobCode, newPassword) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert("Senha redefinida com sucesso.");
    } catch (error) {
      console.error("Erro ao redefinir senha: ", error);
      alert("Não foi possível redefinir a senha.");
    }
  };

  const editProfile = async (user, name, bio) => {
    await updateProfile(user, { displayName: name });
    await updateDoc(doc(db, "users", user.uid), {
      name: name,
      bio: bio,
    });
  };

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
        logOut,
        user,
        sendResetEmail,
        resetPassword,
        editProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
