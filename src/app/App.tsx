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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
