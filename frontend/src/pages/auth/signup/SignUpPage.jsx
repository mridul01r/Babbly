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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
      {/* Left side with background and logo */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative overflow-hidden">
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-32 bg-blue-400 rounded-full transform scale-x-150 blur-lg"></div>
          <div className="absolute top-2/4 left-0 right-0 h-32 bg-blue-400 rounded-full transform scale-x-150 blur-lg"></div>
        </div>
        
        <div className="relative z-10 max-w-md w-full text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="bg-blue-800 border-2 border-blue-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Babbly Today
          </h1>
          <p className="text-blue-100 text-lg opacity-90">
            Share your thoughts with the world
          </p>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gray-900">
        <div className="max-w-md w-full py-6 px-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="mt-2 text-gray-400">Sign up in just a few steps</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
            </div>

            {/* Username and Full Name in two columns */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Choose a username"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>
            </div>

            {/* Error Message */}
            {isError && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded">
                {error.message}
              </div>
            )}

            {/* Sign Up Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "SIGN UP"
                )}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;