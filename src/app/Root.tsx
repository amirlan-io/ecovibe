import { lazy, Suspense, useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BottomNav } from "./components/BottomNav";
import { RouteScrollManager } from "./components/RouteScrollManager";
import { initAnalytics, trackGoal } from "./utils/analytics";

const AppToaster = lazy(() =>
  import("./components/AppToaster").then((m) => ({ default: m.AppToaster })),
);

export function Root() {
  useEffect(() => {
    initAnalytics();

    // Delegated click tracking: every WhatsApp/tel link on the site (header,
    // footer, bottom nav, service pages, forms) fires the right goal without
    // needing an onClick handler wired into each one individually.
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest("a[href]");
      const href = link?.getAttribute("href");
      if (!href) return;

      if (href.startsWith("https://wa.me/")) {
        trackGoal("whatsapp_click", { href });
      } else if (href.startsWith("tel:")) {
        trackGoal("phone_click", { href });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <Suspense fallback={null}>
        <AppToaster />
      </Suspense>
      <RouteScrollManager />
      <Header />
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
