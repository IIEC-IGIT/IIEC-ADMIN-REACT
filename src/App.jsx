import "./App.css";
import { Link, Outlet, useRoutes } from "react-router-dom";
import Login from "./pages/login";
import Shield from "./components/shield";
import Home from "./pages/home";
import EventsRoute from "./pages/events";
import AnnouncementsRoute from "./pages/announcments";
import MembersRoute from "./pages/members";
import GalleryRoute from "./pages/gallery";

function App() {
  const router = useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "",
      element: (
        <Shield>
          <div className="p-16">
            <Link
              to="/"
              className="block text-4xl text-blue-500 text-center font-bold mb-6"
            >
              IIEC ADMIN PANEL
            </Link>
            <Outlet />
          </div>
        </Shield>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        AnnouncementsRoute,
        EventsRoute,
        MembersRoute,
        GalleryRoute,
      ],
    },
  ]);

  return router;
}

export default App;
