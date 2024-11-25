import InfoCards from "./InfoCards";

export default function InfoCardContainer({ list }) {
  return (
    <ul className="flex gap-5 overflow-auto">
      {list.map((item) => (
        <InfoCards icon={item.icon} info={item.info} message={item.message} />
      ))}
    </ul>
  );
}
