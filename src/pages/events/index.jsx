import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, Outlet, useRoutes } from "react-router-dom";
import { APIContext } from "../../components/shield";
import GlobalConfig from "../../config";

function CreateEvents() {
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
    const response = await fetch(GlobalConfig.apiurl + "/events", {
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
        <label className="label" htmlFor="time">
          <span className="label-text">Time</span>
        </label>
        <input
          type="time"
          className="input input-bordered"
          id="time"
          {...register("time", { required: true })}
        />
        {errors.time && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="venue">
          <span className="label-text">Venue</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          id="venue"
          {...register("venue", { required: true })}
        />
        {errors.venue && (
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
          {...register("image", { required: true })}
        />
        {errors.image && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>

      <button
        type="submit"
        className={`btn btn-primary mt-4`}
        disabled={isSubmitting}
      >
        {!isSubmitting ? (
          "Create Event"
        ) : (
          <span className="loading loading-dots"></span>
        )}
      </button>
    </form>
  );
}

function ManageEvents() {
  const [events, setEvents] = useState(null);
  const apikey = useContext(APIContext);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(GlobalConfig.apiurl + "/events");
      if (response.ok) {
        setEvents(await response.json());
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {Array.isArray(events) ? (
        events.length > 0 ? (
          events.map(
            ({ title, description, date, time, venue, image, _id }) => (
              <div
                className="card card-side bg-neutral shadow-xl w-1/2 min-w-[384px] max-w-xl mx-auto"
                key={_id}
              >
                <figure className="max-w-[25%]">
                  <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p className="card-subtitle">
                    {venue} • {date} • {time}
                  </p>
                  <p className="card-text">{description}</p>
                  <div className="card-actions">
                    <button
                      className="btn btn-accent btn-outline btn-sm"
                      title="To be implemented"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost btn-outline btn-error btn-sm"
                      onClick={async () => {
                        if (confirm("Are you sure?") === false) return;
                        const response = await fetch(
                          GlobalConfig.apiurl + "/events/" + _id,
                          {
                            headers: {
                              Authorization: "Bearer " + apikey,
                            },
                            method: "DELETE",
                          }
                        );
                        if (response.ok) {
                          setEvents(
                            events.filter((event) => event._id !== _id)
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
            <span className="text-2xl">No events found</span>
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

function Events() {
  return (
    <div className="events">
      <h1 className="text-3xl font-semibold text-info text-center mb-4">
        Events
      </h1>
      <div className="flex gap-10 justify-center items-center mb-5">
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Create Event
        </NavLink>
        <NavLink
          to="/events/manage"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Manage Events
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

const EventsRoute = {
  path: "/events",
  element: <Events />,
  children: [
    {
      path: "",
      element: <CreateEvents />,
    },
    {
      path: "manage",
      element: <ManageEvents />,
    },
  ],
};

export default EventsRoute;
