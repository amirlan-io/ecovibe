import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { BottomNav } from "./components/BottomNav";
import { RouteScrollManager } from "./components/RouteScrollManager";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouteScrollManager />
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}
