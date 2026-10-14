import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 overflow-x-hidden pt-24 md:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}