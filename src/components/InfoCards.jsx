export default function InfoCards({ icon, info, message }) {
  return (
    <li className="min-w-[300px] h-[300px] bg-light-green p-7 rounded-xl flex flex-col justify-center gap-5">
      <span className="w-[64px] bg-gradient-to-r from-primary to-secondary text-2xl text-light p-5 rounded-lg">
        {icon}
      </span>
      <h1 className="font-semibold text-3xl">{info}</h1>
      <p className="text-zinc-500">{message}</p>
    </li>
  );
}
