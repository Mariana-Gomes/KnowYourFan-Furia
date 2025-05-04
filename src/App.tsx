import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

import { Toast } from "./components/Toast";
import { useAuth } from "./hooks/useAuth";

export function App() {
  const { message, shouldShowToast, hideToast, isError } = useAuth();

  return (
    <BrowserRouter>
      <Routes />
      {shouldShowToast && (
        <Toast message={message} isError={isError} onClose={hideToast} />
      )}
    </BrowserRouter>
  );
}
