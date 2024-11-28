import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";

import ToastNotifications from "../../components/ToastNotifications";
import CompanyCard from "../../components/CompanyCard";

export default function CompanyPage() {
  const [company, setCompany] = useState("");
  const [code, setCode] = useState("");
  const [companies, setCompanies] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const registerCompany = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "companies"), {
        company: company,
        code: code,
      });
      setCompany("");
      setCode("");
      setToastMessage("Empresa registrada!");
      setToastType("success");
    } catch (error) {
      setToastMessage(error.message);
      setToastType("danger");
      console.log(error.message);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "companies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let listOfCompanies = [];
      querySnapshot.forEach((doc) => {
        listOfCompanies.push({ ...doc.data(), id: doc.id });
      });
      setCompanies(listOfCompanies);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <div className="page">
      {toastMessage && (
        <ToastNotifications
          message={toastMessage}
          success={toastType === "success"}
          warning={toastType === "warning"}
          danger={toastType === "danger"}
        />
      )}
      <form
        className="w-[75%] bg-light-green mx-auto p-5 rounded-xl flex flex-col items-center gap-5"
        onSubmit={registerCompany}
      >
        <h1 className="text-2xl font-semibold">Cadastro de Empresas</h1>
        <img
          src="/empresa-desconhecida.svg"
          alt="logo da empresa"
          className="size-52"
        />
        <input type="file" className="input" />
        <input
          type="text"
          className="input"
          placeholder="Empresa: "
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="CNPJ/CPF: "
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn-green">Cadastrar</button>
      </form>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {companies.map((comp) => (
          <CompanyCard key={comp.id} logo={""} company={comp.company} code={comp.code} />
        ))}
      </ul>
    </div>
  );
}
