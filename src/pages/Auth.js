import {React, useContext, useState } from "react";
import { login, signup } from "../api/auth.apicall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
 const AuthPage = ()=> {
  const navigate= useNavigate();
  const{setCheckId} = useContext(userContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading,setLoding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoding(true);
      if(isLogin){
        const response = await login(formData);
        toast.success("successfully login...");
        const {token,id } = response?.data?.data
        localStorage.setItem("authToken",token);
        setCheckId(id);
        navigate("/");
      }else{
        const response = await signup(formData);
        toast.success("successfully signup...");
        const {token,id } = response?.data?.data
        localStorage.setItem("authToken",token);
        setCheckId(id);
        navigate("/");      
       }
    } catch (error) {
         toast.error(error.response.message|| error.response.data.message|| error.message || "something went wrong")
    }finally{
      setLoding(false);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                required 
                className="w-full px-3 py-2 border rounded-lg" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              className="w-full px-3 py-2 border rounded-lg" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
              className="w-full px-3 py-2 border rounded-lg" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AuthPage;