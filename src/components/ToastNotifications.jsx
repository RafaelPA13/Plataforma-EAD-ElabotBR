import { FaRegCheckCircle } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscError } from "react-icons/vsc";

import { useEffect, useState } from "react";

export default function ToastNotifications({
  message,
  success,
  warning,
  danger,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const backgroundColor = success
    ? "bg-secondary"
    : warning
    ? "bg-yellow-500"
    : "bg-primary";
  const borderColor = success
    ? "border-green-500"
    : warning
    ? "border-yellow-300"
    : "border-red-300";
  const textColor = success
    ? "text-green-500"
    : warning
    ? "text-yellow-300"
    : "text-red-300";
  const progressBarColor = success
    ? "bg-green-500"
    : warning
    ? "bg-yellow-300"
    : "bg-red-300";
  const Icon = success
    ? FaRegCheckCircle
    : warning
    ? RiErrorWarningLine
    : VscError;

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, success, warning, danger]);

  if (!isVisible) return null;

  return (
    <div
      className={`w-[300px] ${backgroundColor} p-4 shadow-zinc-300 shadow-md border-2 ${borderColor} rounded-lg ${textColor} font-semibold flex flex-col items-start gap-3 absolute top-2 md:top-10 md:right-4`}
    >
      <div className="flex items-center gap-3">
        <Icon className="text-xl" />
        <p>{message}</p>
      </div>
      <div className="w-full h-1 relative overflow-hidden rounded-b-lg">
        <div
          className={`absolute left-0 top-0 h-full ${progressBarColor}`}
          style={{ animation: "shrink 5s linear forwards" }}
        />
      </div>
    </div>
  );
}
