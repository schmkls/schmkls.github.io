import { createBrowserRouter, Outlet, Navigate } from "react-router";
import { ideas } from "./ideas";
import { Header } from "~/components/Header";
import Landing from "~/pages/Landing";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
      ...ideas.map((idea) => ({
        path: idea.path,
        element: <idea.component tagline={idea.tagline} />,
      })),
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
