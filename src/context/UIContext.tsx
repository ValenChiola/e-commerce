import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import "./UIContext.css";

const defaultToast: ToastProps = {
  message: null,
  delay: 3,
  type: "success",
};

const Context = createContext({} as ContextValues);
Context.displayName = "UIContext";

// Hook
export const useUIContext = () => useContext(Context);

// HOC
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState(defaultToast);

  useEffect(() => {
    const timeOut = setTimeout(
      () => setToast(defaultToast),
      toast.delay * 1000
    );
    return () => {
      clearTimeout(timeOut);
    };
  }, [toast]);

  const showToast = (
    message: ToastProps["message"],
    type: ToastProps["type"] = "success",
    delay: ToastProps["delay"] = 3
  ) => {
    if (typeof message !== "string") message = String(message);
    console.log(message)
    setToast({
      message,
      delay,
      type,
    });
  };

  const showError = (error: unknown) =>
    showToast(handleError(error), "error", 5);

  const handleError = (error: any) => {
    if (typeof error === "string") return error;

    if ("message" in error) return error.message;

    return JSON.stringify(error);
  };

  return (
    <Context.Provider value={{ showToast, showError }}>
      {children}
      {toast.message && (
        <div
          className={`toast-notification ${toast.type}`}
          onClick={() => setToast(defaultToast)}
          aria-hidden="true"
        >
          {toast.message}
        </div>
      )}
    </Context.Provider>
  );
};

// Interfaces
interface ContextValues {
  showToast: (
    message: ToastProps["message"],
    type?: ToastProps["type"],
    delay?: ToastProps["delay"]
  ) => void;
  showError: (error: unknown) => void;
}

interface ToastProps {
  message: string | null;
  delay: number;
  type: "success" | "error" | "info";
}
