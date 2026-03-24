import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://aniledzyai.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});
