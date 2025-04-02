import { customAxios } from "../config/axios";

const module = "auth"

const axios = customAxios(module);



export const signup= async (data) => {
  console.log(data)
  const response = await axios.post("/signup", data);
  return response
};

export const login = async(data) => {
  const response = await axios.post("/login", data);
  return response
}


export const verifyToken = async () => {
  const response = await axios.get("/verify-token")
  return response
}