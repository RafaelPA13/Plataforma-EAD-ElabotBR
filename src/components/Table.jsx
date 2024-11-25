export default function Table({ type }) {
  return (
    <table className="bg-light-green rounded-2xl">
        {type === "users" ? (
          <span className="p-5 flex flex-wrap items-center justify-between gap-5">
            <h1 className="text-3xl font-semibold">Lista de uauários</h1>
            <div className="flex gap-5">
              <button className="btn-red">Importar</button>
              <button className="btn-green">Exportar</button>
            </div>
          </span>
        ) : type === "sells" ? (
          <span className="p-5 flex flex-wrap items-center justify-between gap-5">
            <h1 className="text-3xl font-semibold">Lista de vendas</h1>
            <div className="flex gap-5">
              <button className="btn-red">Pagos</button>
              <button className="btn-green">Pendentes</button>
            </div>
          </span>
        ) : (
          <h1 className=" p-5 text-3xl font-semibold">Métricas</h1>
        )}
        
    </table>
  );
}
