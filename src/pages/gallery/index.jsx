import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Outlet } from "react-router-dom";
import { APIContext } from "../../components/shield";
import GlobalConfig from "../../config";

function CreateGallery() {
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
    for (const file of data.image) {
      formdata.append("photos", file);
    }
    const response = await fetch(GlobalConfig.apiurl + "/gallery", {
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
          {...register("description")}
        ></textarea>
      </div>
      <div className="form-control">
        <label className="label" htmlFor="image">
          <span className="label-text">Images</span>
          <span className="label-text-alt text-xs text-gray-500">
            (can upload multiple images)
          </span>
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg, image/apng, image/avif, image/tiff, image/bmp"
          className="input input-bordered"
          id="image"
          multiple
          {...register("image")}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary mt-4`}
        disabled={isSubmitting}
      >
        {!isSubmitting ? "Add" : <span className="loading loading-dots"></span>}
      </button>
    </form>
  );
}

function ManageGallery() {
  return <></>;
}

function Gallery() {
  return (
    <div className="Gallery">
      <h1 className="text-3xl font-semibold text-info text-center mb-4">
        Gallery
      </h1>
      <div className="flex gap-10 justify-center items-center mb-5">
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Add Image
        </NavLink>
        <NavLink
          to="/gallery/manage"
          className={({ isActive }) =>
            `text-center text-neutral-content text-2xl font-medium hover:underline ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Manage Gallery
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

const GalleryRoute = {
  path: "/gallery",
  element: <Gallery />,
  children: [
    {
      path: "",
      element: <CreateGallery />,
    },
    {
      path: "manage",
      element: <ManageGallery />,
    },
  ],
};

export default GalleryRoute;
