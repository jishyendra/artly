import React from "react";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string | null | undefined;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-start gap-1 rounded-md border border-red-200 bg-red-50 p-1">
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
      <div className="text-sm font-medium text-red-700">{message}</div>
    </div>
  );
};
export default FormError;
