import { useAlertStore, IAlertState } from "@/services/states/alert.service";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Check, InfoIcon, Terminal, TriangleAlert, Ban } from "lucide-react";

export default function DynamicAlert() {
  const { isVisible, message, type } = useAlertStore(
    (state) => state as IAlertState,
  );

  if (!isVisible) {
    return null;
  }

  const alertTypeToVariant = {
    success: "default",
    error: "destructive",
    info: "default",
    warning: "default",
  };

  return (
    <Alert
      variant={
        alertTypeToVariant[type as keyof typeof alertTypeToVariant] as
          | "default"
          | "destructive"
          | undefined
      }
      className="absolute bottom-2 right-2  bg-gray-800 text-white shadow-lg z-50 mx-auto 
       mt-9 max-w-sm gap-4"
    >
      {(() => {
        switch (type) {
          case "success":
            return (
              <Check className="h-6 w-6 text-green-500 dark:text-green-500" />
            );
          case "error":
            return <Ban className="h-6 w-6 text-red-500 dark:text-red-500" />;
          case "info":
            return (
              <InfoIcon
                className="h-6 w-6 
            text-blue-500 dark:text-blue-500
            "
              />
            );
          case "warning":
            return (
              <TriangleAlert
                className="h-6 w-6 
            text-yellow-500 dark:text-yellow-500
            "
              />
            );
          default:
            return <Terminal className="h-6 w-6" />;
        }
      })()}

      <AlertTitle className="font-bold">{type.toUpperCase()}</AlertTitle>
      <AlertDescription className="font-semibold">{message}</AlertDescription>
    </Alert>
  );
}
