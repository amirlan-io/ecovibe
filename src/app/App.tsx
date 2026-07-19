import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route
            path="privacy"
            lazy={() =>
              import("./pages/Privacy").then((m) => ({ Component: m.Privacy }))
            }
          />
          <Route
            path="o-nas"
            lazy={() =>
              import("./pages/About").then((m) => ({ Component: m.About }))
            }
          />
          <Route
            path="vakansii"
            lazy={() =>
              import("./pages/Careers").then((m) => ({ Component: m.Careers }))
            }
          />
          <Route
            path="kontakty"
            lazy={() =>
              import("./pages/Contacts").then((m) => ({ Component: m.Contacts }))
            }
          />
          <Route
            path="generalnaya-uborka"
            lazy={() =>
              import("./pages/GeneralCleaning").then((m) => ({
                Component: m.GeneralCleaning,
              }))
            }
          />
          <Route
            path="vlazhnaya-uborka"
            lazy={() =>
              import("./pages/WetCleaning").then((m) => ({ Component: m.WetCleaning }))
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
