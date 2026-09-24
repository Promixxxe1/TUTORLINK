import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main >
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}