import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { WetCleaning } from "./pages/WetCleaning";
import { GeneralCleaning } from "./pages/GeneralCleaning";
import { Prices } from "./pages/Prices";
import { About } from "./pages/About";
import { Contacts } from "./pages/Contacts";
import { Careers } from "./pages/Careers";
import { Privacy } from "./pages/Privacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "wet-cleaning", Component: WetCleaning },
      { path: "general-cleaning", Component: GeneralCleaning },
      { path: "prices", Component: Prices },
      { path: "about", Component: About },
      { path: "contacts", Component: Contacts },
      { path: "careers", Component: Careers },
      { path: "privacy", Component: Privacy },
    ],
  },
]);
