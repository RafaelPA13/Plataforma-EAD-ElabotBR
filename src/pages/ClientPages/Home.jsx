import CompanyCard from "../../components/CompanyCard";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function ClientHomePage() {
  const [companies, setCompanies] = useState([]);

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
    <div className="client-page">
      <h1 className="title">Empresas</h1>
      <ul className="card-grid">
        {companies
          .filter((comp) => comp.active == true)
          .map((comp) => (
            <CompanyCard
              key={comp.id}
              id={comp.id}
              logo={""}
              company={comp.company}
              code={comp.code}
              active={comp.active}
              admin={false}
            />
          ))}
      </ul>
    </div>
  );
}
