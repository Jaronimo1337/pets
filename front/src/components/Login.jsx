import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
    const [error, setError] = useState(null);
  
    const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async (formdata) => {
      try {
        const { data: response } = await axios.post(
          `${API_URL}/users/login`,
          formdata,
          { withCredentials: true }
        );
        setUser(response.data);
        console.log(response.data)
        navigate("/invoice");

      } catch (error) {
        if(axios.isAxiosError(error)){  // axios.isAxiosError(error) is a built-in method in Axios that checks whether the error object comes from an Axios request.
            if(error.response){
                setError(error.response.data.message || "An error occurred, please try again");
            }else if(error.request){
                setError("No response from server. Check internet connection")
            } else {
                setError("Something went wrong, please try again")}
            }else{
                setError("An unexpected error occurred, please try again")
            }
        } 
      }
  
    return (
        <div className=" max-w-md mx-auto p-4 mt-50 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl flex justify-center items-center font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <div>{error}</div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" {...register("email")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
  <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button></div>
        <p>Dont have account? <a className="text-blue-600" href="/">Register</a></p>
      </form>
    </div>
    );
  }
  export default LoginForm