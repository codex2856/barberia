import { lazy, StrictMode, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

// El panel de admin solo se descarga cuando alguien abre /#/admin.
const AdminApp = lazy(() => import("./admin/AdminApp.tsx"));

const isAdminRoute = () => window.location.hash.startsWith("#/admin");

function Root() {
  const [admin, setAdmin] = useState(isAdminRoute);

  useEffect(() => {
    const onHashChange = () => {
      if (isAdminRoute()) {
        setAdmin(true);
      } else if (admin) {
        // Al salir del panel se recarga para que la web lea lo que se editó.
        window.location.reload();
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [admin]);

  if (admin) {
    return (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    );
  }
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </StrictMode>,
);
