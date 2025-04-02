import { customAxios } from "../config/axios"

const modulename = "posts"

const axios = customAxios(modulename)




export const createPost = async(data) =>{
    const response = await axios.post("/create", data)
    return response
}


export const getAllPosts = async(page, limit) =>{
    const response = await axios.get(`/getall?page=${page}&limit=${limit}`)
    return response
}
export const getAllPastPosts = async(limit) =>{
    const response = await axios.get("/getallpast-post", {params:{limit:limit}})
    return response
}


export const getSinglePost = async(id) =>{
    const response = await axios.get("/getsingle", {params:{id:id}})
    return response
}

export const deletePost = async(id) =>{
    const response = await axios.delete("/delete", {params:{id:id}})
    return response
}




