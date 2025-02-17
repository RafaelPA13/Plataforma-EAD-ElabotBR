import MaterialLinks from "./MaterialLinks";

export default function ContentMaterials({ materialList }) {
  return (
    <div className="tabs-content">
      <h1 className="title">Materiais</h1>
      <ul className="flex flex-col gap-3">
        {materialList.map((material) => (
          <MaterialLinks
            name={material.name}
            url={material.url}
            admin={false}
          />
        ))}
      </ul>
    </div>
  );
}
