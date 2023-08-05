import "./App.css";
import { Link, Outlet, useRoutes } from "react-router-dom";
import Login from "./pages/login";
import Shield from "./components/shield";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import Announcments from "./pages/announcments";
import Members from "./pages/members";
import Achievements from "./pages/achievements";
import EventsRoute from "./pages/events";

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
        {
          path: "acheivements",
          element: <Achievements />,
        },
        {
          path: "announcments",
          element: <Announcments />,
        },
        EventsRoute,
        {
          path: "gallery",
          element: <Gallery />,
        },
        {
          path: "members",
          element: <Members />,
        },
      ],
    },
  ]);

  return router;
}

export default App;
