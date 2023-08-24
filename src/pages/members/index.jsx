import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, Outlet, useRoutes } from "react-router-dom";
import { APIContext } from "../../components/shield";
import GlobalConfig from "../../config";

function CreateMembers() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const apikey = useContext(APIContext);

  const onSubmit = async (data) => {
    console.log(data);
    const formdata = new FormData();
    for (const key in data) {
      if (key === "image") continue;
      else if (key === "links") formdata.append(key, JSON.stringify(data[key]));
      else formdata.append(key, data[key]);
    }
    formdata.append("image", data.image[0]);
    const response = await fetch(GlobalConfig.apiurl + "/members", {
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
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          id="title"
          {...register("name", { required: true })}
        />
        {errors.title && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          className="input input-bordered"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="phone">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          id="phone"
          {...register("phone", { required: true, pattern: /\d{10}/ })}
        />
        {errors.phone && (
          <span className="text-error text-xs mt-2">errors.phone</span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="year">
          <span className="label-text">Passout Year</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          id="year"
          {...register("year", { required: true })}
        />
        {errors.year && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="role">
          <span className="label-text">Role</span>
        </label>
        <select
          className="select select-bordered"
          id="role"
          {...register("role", { required: true })}
        >
          <option value="" selected disabled>
            Select
          </option>
          <option value="coordinater">Coordinater</option>
          <option value="ambassador">Ambassador</option>
          <option value="member">Member</option>
        </select>
        {errors.role && (
          <span className="text-error text-xs mt-2">
            This field is required
          </span>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="image">
          <span className="label-text">Avatar</span>
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
      <div className="form-control">
        <label className="label" htmlFor="link-0">
          <span className="label-text">Link 1</span>
        </label>
        <div className="grid grid-cols-6">
          <div className="col-span-2">
            <select
              className="select select-bordered"
              id="link-name-0"
              {...register("links.0.name", { required: true })}
            >
              <option value="" selected disabled>
                Select
              </option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="github">Github</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div className="col-span-4">
            <input
              type="text"
              className="input input-bordered w-full"
              id="link-0"
              {...register("links.0.url", { required: true })}
            />
            {errors.link && (
              <span className="text-error text-xs mt-2">
                This field is required
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label" htmlFor="link-0">
          <span className="label-text">Link 2</span>
        </label>
        <div className="grid grid-cols-6">
          <div className="col-span-2">
            <select
              className="select select-bordered"
              id="link-name-0"
              {...register("links.1.name", { required: true })}
            >
              <option value="" selected disabled>
                Select
              </option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="github">Github</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div className="col-span-4">
            <input
              type="text"
              className="input input-bordered w-full"
              id="link-0"
              {...register("links.1.url", { required: true })}
            />
            {errors.link && (
              <span className="text-error text-xs mt-2">
                This field is required
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-primary mt-4`}
        disabled={isSubmitting}
      >
        {!isSubmitting ? (
          "Add Member"
        ) : (
          <span className="loading loading-dots"></span>
        )}
      </button>
    </form>
  );
}

function ManageMembers() {
  return <></>;
}

function Members() {
  return (
    <div className="events">
      <h1 className="text-3xl font-semibold text-info text-center mb-4">
        Members
      </h1>
      <div className="flex gap-10 justify-center items-center mb-5">
        <NavLink
          to="/members"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Add Member
        </NavLink>
        <NavLink
          to="/members/manage"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Manage Members
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

const MembersRoute = {
  path: "/members",
  element: <Members />,
  children: [
    {
      path: "",
      element: <CreateMembers />,
    },
    {
      path: "manage",
      element: <ManageMembers />,
    },
  ],
};

export default MembersRoute;
