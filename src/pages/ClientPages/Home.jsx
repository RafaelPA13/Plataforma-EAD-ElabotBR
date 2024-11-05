import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

export default function ClientHomePage() {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const exit = async () => {
    try {
      await logOut();
      navigate("/");
      alert("Você saiu");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Seja bem vindo, {user && user.displayName} você é um cliente</h1>
      <button onClick={exit} className="btn-red">Sair</button>
    </>
  );
}
