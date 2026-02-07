import axios from "axios";

const http = axios.create({
  baseURL: "https://dahilass.ru/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default http;
