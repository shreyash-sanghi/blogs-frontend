import axios from "axios"


const baseUrl  = `${process.env.REACT_APP_BACKEND_URL}/api/v1`
const authToken = localStorage.getItem("authToken");

export const axiosinstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})



export const customAxios = (modulename) =>{
    return axios.create({
        baseURL: `${baseUrl}/${modulename}`,
        headers: {
            "Content-Type": "application/json",
            ...(authToken!=null && { "Authorization": authToken})
          }
    })
}