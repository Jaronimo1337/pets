import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordconfirm: '',
    },
    validation: {
      username: {
        required: true,
        minLength: 3,
      },
      email: {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
      password: {
        required: true,
        minLength: 8,
      },
      passwordconfirm: {
        required: true,
        validate: (value) => value === register.password,
      },
    },
  });

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, data);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-50 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl flex justify-center items-center font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            {...register("username")}
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordconfirm">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordconfirm"
            type="password"
            {...register("passwordconfirm")}
          />
          {errors.passwordconfirm && <p className="text-red-500 text-xs">{errors.passwordconfirm.message}</p>}
        </div>
        <div className="flex justify-center"><button
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button></div>
        <p className="mt-2">Already have account? <a className="text-blue-600" href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default RegisterForm;