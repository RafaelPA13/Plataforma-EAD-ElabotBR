import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

import CompanyCard from "../../components/CompanyCard";

export default function ClassPage() {
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
    <div className="page">
      <h1 className="title">Treinamentos</h1>
      <ul className="card-grid">
        {companies.map((comp) => (
          <CompanyCard
            key={comp.id}
            id={comp.id}
            logo={""}
            company={comp.company}
            code={comp.code}
            active={comp.active}
            admin={true}
          />
        ))}
      </ul>
    </div>
  );
}
