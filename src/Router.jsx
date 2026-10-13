import { lazy, Suspense, useEffect, useState } from "react";
import App from "./App.jsx";

const Admin = lazy(() => import("./Admin.jsx"));
export default function Router() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  const isAdmin = hash === "#/admin";
  useEffect(() => {
    document.title = isAdmin
      ? "Admin | Hanif Rafi"
      : "Hanif Salmizah Rafi | Fullstack Developer";
    if (isAdmin) window.scrollTo(0, 0);
  }, [isAdmin]);
  return isAdmin ? (
    <Suspense
      fallback={
        <p className="container" role="status">
          Memuat admin…
        </p>
      }
    >
      <Admin />
    </Suspense>
  ) : (
    <App />
  );
}
