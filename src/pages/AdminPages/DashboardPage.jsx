import { FaDollarSign } from "react-icons/fa6";
import InfoCardContainer from "../../components/InfoCardContainer";

export default function DashboardPage() {
  const cardInfoList = [
    { icon: <FaDollarSign />, info: "R$5500,00", message: "Valor Total" },
    { icon: <FaDollarSign />, info: "R$5500,00", message: "Valor Total" },
    { icon: <FaDollarSign />, info: "R$5500,00", message: "Valor Total" },
    { icon: <FaDollarSign />, info: "R$5500,00", message: "Valor Total" },
  ];

  return (
    <div className="page">
      <h1 className="title">Dashboard</h1>
      <InfoCardContainer list={cardInfoList} />
    </div>
  );
}
