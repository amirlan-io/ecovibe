import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "privacy", Component: Privacy },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
