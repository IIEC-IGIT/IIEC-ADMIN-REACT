import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="flex flex-col itmes-center gap-3 mt-6 w-80 mx-auto">
        <Link
          to="/gallery"
          className="text-center text-neutral-content text-2xl font-medium hover:underline"
        >
          Gallery
        </Link>
        <Link
          to="/events"
          className="text-center text-neutral-content text-2xl font-medium hover:underline"
        >
          Events
        </Link>
        <Link
          to="/members"
          className="text-center text-neutral-content text-2xl font-medium hover:underline"
        >
          Members
        </Link>
        <Link
          to="/achievements"
          className="text-center text-neutral-content text-2xl font-medium hover:underline"
        >
          Achievements
        </Link>
        <Link
          to="/announcements"
          className="text-center text-neutral-content text-2xl font-medium hover:underline"
        >
          Announcments
        </Link>
        <button
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
          className="text-center text-neutral-content text-2xl font-medium hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
