import { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { RouteScrollManager } from "./components/RouteScrollManager";

const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer })),
);
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
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BottomNav />
    </div>
  );
}
