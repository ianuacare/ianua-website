import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
import GenerateArticle from "./pages/GenerateArticle";
import Home from "./pages/Home";
import IanuaMindLanding from "./pages/IanuaMindLanding";
import Legal from "./pages/Legal";
import { privacyPolicy, termsOfService } from "./copy/legal";

function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ianua-mind", element: <IanuaMindLanding /> },
      { path: "privacy", element: <Legal doc={privacyPolicy} /> },
      { path: "termini", element: <Legal doc={termsOfService} /> },
      { path: "generate-article", element: <GenerateArticle /> },
      { path: "coming-soon", element: <ComingSoon /> },
      { path: "home", element: <Navigate to="/" replace /> },
      { path: "home/", element: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
