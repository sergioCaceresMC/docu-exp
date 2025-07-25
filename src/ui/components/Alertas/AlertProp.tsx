import { useEffect } from "react";

interface AlertProps {
  type?: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

const colors = {
  success: "bg-green-400 text-white border-green-400",
  error: "bg-red-500 text-white border-red-600",
  info: "bg-blue-400 text-white border-blue-400",
};

export default function Alert({ type = "info", message, onClose }: AlertProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Se cierra en 3 segundos

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 border-x-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl border p-4 rounded shadow-md z-50 transition-all duration-300 text-center ${colors[type]}`}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
