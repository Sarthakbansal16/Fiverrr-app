import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiverrr-appp.onrender.com",
  withCredentials: true,
});

export default newRequest;