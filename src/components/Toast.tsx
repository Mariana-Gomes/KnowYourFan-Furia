import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";

type ErrorToastProps = {
  message: string;
  onClose: () => void;
  isError: boolean;
};

export const Toast = ({ message, onClose, isError }: ErrorToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`fixed top-32 right-4 z-50 ${
        isError ? " bg-red-600" : "bg-green-600"
      } text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-2 w-[300px]
      transition-all duration-300 ease-in-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <X className="w-4 h-4 text-white hover:text-gray-200" />
      </button>
    </div>
  );
};
