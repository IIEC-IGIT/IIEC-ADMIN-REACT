import { useForm } from "react-hook-form";
import GlobalConfig from "../../config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    const response = await fetch(GlobalConfig.apiurl + "/login", {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { token } = await response.json();
      sessionStorage.setItem("apikey", token);
      navigate("/");
    } else {
      alert("Login failed: " + (await response.json()).error);
    }
  };

  return (
    <div className="login pt-16">
      <h1 className="text-3xl font-bold text-center">
        Login to IIEC Admin Panel
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-80 mx-auto mt-10"
      >
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            placeholder="example@mail.com"
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
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-error text-xs mt-2">
              This field is required
            </span>
          )}
        </div>
        <button
          className={`btn btn-accent ${isSubmitting ? "loading" : ""}`}
          type="submit"
        >
          <span className="btn-text">Login</span>
        </button>
      </form>
    </div>
  );
}
