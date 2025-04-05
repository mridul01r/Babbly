import { Link } from "react-router-dom";
import { useState } from "react";
import XSvg from "../../../components/svgs/X";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to create account");

        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen bg-gray-900">
      <div className="flex-1 hidden lg:flex items-center justify-center bg-blue-600">
        <XSvg className="lg:w-2/3 fill-white opacity-90 transform hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-10">
        <div className="w-full max-w-md">
          <form className="flex gap-5 flex-col mb-8" onSubmit={handleSubmit}>
            <div className="text-center mb-2">
              <XSvg className="w-16 h-16 mx-auto lg:hidden fill-white mb-4" />
              <h1 className="text-4xl font-extrabold text-white mb-2">Join today.</h1>
              <p className="text-gray-300">Create your account in just a few steps</p>
            </div>
            
            <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-200 focus-within:border-blue-500 px-4 py-3">
              <MdOutlineMail className="text-gray-400" />
              <input
                type="email"
                className="grow bg-transparent focus:outline-none text-white"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </label>
            
            <div className="flex gap-4 flex-wrap">
              <label className="input input-bordered rounded-lg flex items-center gap-2 flex-1 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-200 focus-within:border-blue-500 px-4 py-3">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  className="grow bg-transparent focus:outline-none text-white"
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                  required
                />
              </label>
              <label className="input input-bordered rounded-lg flex items-center gap-2 flex-1 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-200 focus-within:border-blue-500 px-4 py-3">
                <MdDriveFileRenameOutline className="text-gray-400" />
                <input
                  type="text"
                  className="grow bg-transparent focus:outline-none text-white"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={handleInputChange}
                  value={formData.fullName}
                  required
                />
              </label>
            </div>
            
            <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-200 focus-within:border-blue-500 px-4 py-3">
              <MdPassword className="text-gray-400" />
              <input
                type="password"
                className="grow bg-transparent focus:outline-none text-white"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
            </label>
            
            {isError && (
              <div className="bg-red-900 bg-opacity-30 text-red-200 p-3 rounded-lg flex items-center">
                <span className="text-red-500 mr-2">●</span>
                {error.message}
              </div>
            )}
            
            <button className="btn rounded-full btn-primary text-white font-bold py-3 mt-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating account...
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          
          <div className="flex flex-col gap-4 text-center">
            <div className="divider text-gray-500 before:bg-gray-700 after:bg-gray-700">or</div>
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Sign in
              </Link>
            </p>
            <Link to="/login" className="w-full">
              <button className="btn rounded-full btn-outline text-white border-gray-600 hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 w-full">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;