import { useParams } from "react-router-dom";
import { useState } from "react";

import MiniModules from "../../components/MiniModules";
import { Link } from "react-router-dom";
import ContentDescription from "../../components/ContentDescription";
import ContentMaterials from "../../components/ContentMaterials";
import ContentComments from "../../components/ContentComments";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function VideoPage() {
  const { classId } = useParams();
  const tabs = ["Sobre", "Materiais", "Comentários"];
  const content = [
    <ContentDescription />,
    <ContentMaterials />,
    <ContentComments />
  ];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="client-page">
      <div className="flex gap-5">
        <ul className="w-[25%] h-screen bg-light-green rounded-xl p-5 flex flex-col gap-5">
          <MiniModules />
          <MiniModules />
        </ul>
        <div className="w-full flex flex-col gap-5">
          <span className="flex items-center justify-between">
            <Link
              to={""}
              className="flex items-center gap-1 duration-300 p-1 rounded-md hover:text-secondary hover:bg-slate-200"
            >
              <IoIosArrowBack />
              Anterior
            </Link>
            <Link
              to={""}
              className="flex items-center gap-1 duration-300 p-1 rounded-md hover:text-secondary hover:bg-slate-200"
            >
              Próximo
              <IoIosArrowForward />
            </Link>
          </span>
          <iframe
            src="https://player.vimeo.com/video/918016597?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            className="w-full h-[580px]"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <span className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Aula</h1>
            <span className="w-[35%] flex items-center justify-between text-2xl">
              <button className="text-primary">
                <MdFavoriteBorder />
              </button>
              <span className="flex items-center gap-1">
                <p>Avaliação:</p>
                <button className="text-secondary">
                  <FaStar />
                </button>
                <button className="text-secondary">
                  <FaStar />
                </button>
                <button className="text-secondary">
                  <FaStar />
                </button>
                <button className="text-secondary">
                  <FaStar />
                </button>
                <button className="text-secondary">
                  <FaStar />
                </button>
              </span>
            </span>
          </span>
          <div>
            <span className="w-full flex items-center justify-between">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`w-full p-5 border-b-2 ${
                    activeTab === index ? "border-primary" : "bg-light"
                  } hover:bg-slate-200`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </span>
            {content.map((cont, index) => {
              if (activeTab === index) {
                return cont;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
