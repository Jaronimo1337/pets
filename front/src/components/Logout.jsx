import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Logout() {
const navigate = useNavigate();
const handleLogout = async () => {
try {
    await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });
      navigate("/");
}catch (error) {
    console.log(error);
  }
}
  return <div>
        <button className="bg-gray-500/50 hover:bg-gray-700 ml-3 p-2 rounded-2xl text-white" onClick={handleLogout}>Logout</button>

  </div>;
}
export default Logout;
