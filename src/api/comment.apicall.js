import { customAxios } from "../config/axios";

const module = "comments"

const axios = customAxios(module);



export const createNewComment = async (data) => {
  console.log(data)
  const response = await axios.post("/create", data);
  return response
};

export const deleteComment = async(id) => {
  const response = await axios.delete("/delete", {
    params:{
        id
    }
  })
  return response
}


export const updateComment = async (id, data) => {
  const response = await axios.put("/update", data, {
    params:{
        id
    }
  })
  return response
}