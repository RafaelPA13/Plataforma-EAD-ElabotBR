import { useParams } from "react-router-dom";

import MiniModules from "../../components/MiniModules";

export default function VideoPage() {
  const { classId } = useParams();

  return (
    <div className="client-page">
      <div className="flex gap-5">
        <MiniModules />
        <iframe
          src="https://www.youtube.com/embed/T98tI3mPd3M?si=s48cteZnyM3uWDkm"
          className="w-full h-[580px] rounded-2xl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
