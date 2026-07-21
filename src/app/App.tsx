import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";

// `lazy` route loading only works with the Data Router API
// (createBrowserRouter + RouterProvider) — react-router's declarative
// <Routes> never invokes route.lazy(), so every lazy page silently rendered
// empty. See git history for details.
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "privacy",
        lazy: () => import("./pages/Privacy").then((m) => ({ Component: m.Privacy })),
      },
      {
        path: "o-nas",
        lazy: () => import("./pages/About").then((m) => ({ Component: m.About })),
      },
      {
        path: "vakansii",
        lazy: () => import("./pages/Careers").then((m) => ({ Component: m.Careers })),
      },
      {
        path: "kontakty",
        lazy: () => import("./pages/Contacts").then((m) => ({ Component: m.Contacts })),
      },
      {
        path: "generalnaya-uborka",
        lazy: () =>
          import("./pages/GeneralCleaning").then((m) => ({ Component: m.GeneralCleaning })),
      },
      {
        path: "vlazhnaya-uborka",
        lazy: () =>
          import("./pages/WetCleaning").then((m) => ({ Component: m.WetCleaning })),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
