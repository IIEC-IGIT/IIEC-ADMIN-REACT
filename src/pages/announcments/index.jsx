import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, Outlet, useRoutes } from "react-router-dom";
import { APIContext } from "../../components/shield";
import GlobalConfig from "../../config";

function CreateAnnouncements() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const apikey = useContext(APIContext);

  const onSubmit = async (data) => {
    const formdata = new FormData();
    for (const key in data) {
      if (key === "image") continue;
      formdata.append(key, data[key]);
    }
    formdata.append("image", data.image[0]);
    const response = await fetch(GlobalConfig.apiurl + "/Announcements", {
      headers: {
        Authorization: `Bearer ${apikey}`,
      },
      mode: "cors",
      method: "POST",
      body: formdata,
    });

    if (response.ok) {
      alert("Event created successfully");
    } else {
      alert("Event creation failed: " + (await response.json()).error);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-1/2 min-w-[384px] max-w-lg mx-auto p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control">
        <label className="label" htmlFor="title">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          id="title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="description">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea h-24 textarea-bordered"
          id="description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="date">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          className="input input-bordered"
          id="date"
          {...register("date", { required: true })}
        />
        {errors.date && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="image">
          <span className="label-text">Image</span>
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg, image/apng, image/avif, image/tiff, image/bmp"
          className="input input-bordered"
          id="image"
          {...register("image")}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="link">
          <span className="label-text">Link</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          id="link"
          {...register("link")}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary mt-4`}
        disabled={isSubmitting}
      >
        {!isSubmitting ? (
          "Create"
        ) : (
          <span className="loading loading-dots"></span>
        )}
      </button>
    </form>
  );
}

function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState(null);
  const apikey = useContext(APIContext);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch(GlobalConfig.apiurl + "/announcements");
      if (response.ok) {
        setAnnouncements(await response.json());
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div>
      {Array.isArray(announcements) ? (
        announcements.length > 0 ? (
          announcements.map(
            ({
              _id,
              title,
              description,
              date,
              link = undefined,
              image = undefined,
            }) => (
              <div
                className="card card-side bg-neutral shadow-xl w-1/2 min-w-[384px] max-w-xl mx-auto"
                key={_id}
              >
                {image ? (
                  <figure className="w-[25%]">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover w-full h-full"
                    />
                  </figure>
                ) : null}
                <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p className="card-subtitle">{date}</p>
                  <p className="card-text">{description}</p>

                  <div className="card-actions">
                    {link ? (
                      <a
                        target="_blank"
                        className="btn btn-accent btn-outline btn-sm"
                        href={link}
                      >
                        Link
                      </a>
                    ) : null}
                    <a
                      target="_blank"
                      className="btn btn-accent btn-outline btn-sm"
                      title="To be implemented"
                    >
                      More Details
                    </a>
                    <button
                      className="btn btn-ghost btn-outline btn-error btn-sm"
                      onClick={async () => {
                        if (confirm("Are you sure?") === false) return;
                        const response = await fetch(
                          GlobalConfig.apiurl + "/Announcements/" + _id,
                          {
                            headers: {
                              Authorization: "Bearer " + apikey,
                            },
                            method: "DELETE",
                          }
                        );
                        if (response.ok) {
                          setAnnouncements(
                            announcements.filter((event) => event._id !== _id)
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="flex justify-center items-center h-40">
            <span className="text-2xl">No announcements found</span>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-lg"></span>
        </div>
      )}
    </div>
  );
}

function Announcements() {
  return (
    <div className="Announcements">
      <h1 className="text-3xl font-semibold text-info text-center mb-4">
        Announcements
      </h1>
      <div className="flex gap-10 justify-center items-center mb-5">
        <NavLink
          to="/Announcements"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Create Announcement
        </NavLink>
        <NavLink
          to="/Announcements/manage"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Manage Announcements
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

const AnnouncementsRoute = {
  path: "/announcements",
  element: <Announcements />,
  children: [
    {
      path: "",
      element: <CreateAnnouncements />,
    },
    {
      path: "manage",
      element: <ManageAnnouncements />,
    },
  ],
};

export default AnnouncementsRoute;
