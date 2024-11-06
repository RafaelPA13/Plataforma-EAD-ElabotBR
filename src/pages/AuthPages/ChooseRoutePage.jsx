import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { collection, doc, onSnapshot, query } from "firebase/firestore";

export default function ChooseRoutePage() {
  const [userData, setUserData] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === user.uid) {
          setUserData({ ...doc.data(), id: doc.id });
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="bg-auth flex items-center">
      <div className="w-[50%] hidden lg:block">
        <img
          src="/dark-elaborBr-logo.png"
          alt="logo elaborBr"
          className="w-[75%] mx-auto"
        />
      </div>
      <form className="form-auth">
        <img
          src="/logo-trasicao-trabalhista.png"
          alt="Transição Trabalhista"
          className="w-24 md:w-32 lg:w-48"
        />
        <div className="w-full flex flex-col items-start gap-3">
          <h1 className="font-bold text-lg">Olá seja bem vindo(a)!</h1>
          <h2>Com qual perfil você quer trabalhar hoje?</h2>
        </div>

        <ul className="w-full flex flex-col items-center gap-3">
          {userData?.isAdmin && (
            <Link to={"/admin"} className="btn-red">
              Administrador
            </Link>
          )}
          {userData?.isConsultant && (
            <Link to={"/consultor"} className="btn-black">
              Consultor
            </Link>
          )}
          {userData?.isClient && (
            <Link to={"/cliente"} className="btn-green">
              Cliente
            </Link>
          )}
        </ul>
      </form>
    </div>
  );
}
