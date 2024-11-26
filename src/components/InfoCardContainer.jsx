import InfoCards from "./InfoCards";

export default function InfoCardContainer({ list }) {
  return (
    <ul className="min-h-[300px] flex gap-5 overflow-x-auto">
      {list.map((item) => (
        <InfoCards icon={item.icon} info={item.info} message={item.message} />
      ))}
    </ul>
  );
}
