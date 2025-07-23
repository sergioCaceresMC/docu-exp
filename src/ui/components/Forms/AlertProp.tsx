import { useEffect } from "react";

interface AlertProps {
  type?: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

const colors = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
  info: "bg-blue-100 text-blue-800 border-blue-400",
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
