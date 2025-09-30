import { io } from "socket.io-client";
import { BASE_URL } from "./constants";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const createSocketConnection = () => {
  return io(BASE_URL, {
    auth: {
      token: token,
    },
  });
};
