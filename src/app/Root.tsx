import { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BottomNav } from "./components/BottomNav";
import { RouteScrollManager } from "./components/RouteScrollManager";

const AppToaster = lazy(() =>
  import("./components/AppToaster").then((m) => ({ default: m.AppToaster })),
);

export function Root() {
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
