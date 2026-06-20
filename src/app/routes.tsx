import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "privacy",
        lazy: () =>
          import("./pages/Privacy").then((m) => ({ Component: m.Privacy })),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
