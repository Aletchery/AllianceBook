import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] font-sans">
      <Header />
      <div className="overflow-auto bg-slate-200">
        <main className="mx-auto max-w-6xl">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
