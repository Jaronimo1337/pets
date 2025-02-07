import axios from "axios";

const url = "http://localhost:3000/register";

export const post = async (data) => {
  const response = await axios.post(url, data);
  return response.data;
}