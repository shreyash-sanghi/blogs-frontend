import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import PostPage from "./pages/PostPage.js";
import Navbar from "./api/components/Navbar.js";
import AuthPage from "./pages/Auth.js";
import { createContext, useEffect, useState } from "react";
import { verifyToken } from "./api/auth.apicall.js";
import MyPastPost from "./pages/MyPastPost.js";

const userContext = createContext();
function App() {
  const [checkId,setCheckId] = useState(null);
  console.log(checkId);
  const token = localStorage.getItem("authToken");


  const checkToken = async()=>{
    try {
      const response = await verifyToken();
      const id = response?.data?.data;
      setCheckId(id);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(()=>{
    if(token){
      checkToken();
    }

  },[])
  return (
    <> 
    <userContext.Provider value={{setCheckId,checkId}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/my-past-post" element={<MyPastPost />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
export {userContext};
