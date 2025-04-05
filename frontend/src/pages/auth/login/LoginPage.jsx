import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const { mutate: loginMutation, isError, isLoading, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error.message || "An unexpected error occurred");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
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
            Welcome to Babbly
          </h1>
          <p className="text-blue-100 text-lg opacity-90">
            Connect with friends and share your world
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gray-900">
        <div className="max-w-md w-full py-8 px-6 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Welcome</h2>
            <p className="mt-2 text-gray-400">Log in to your account to continue</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email/Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Email or Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email or username"
                  onChange={handleInputChange}
                  value={formData.username}
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
                  placeholder="Enter your password"
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

            {/* Sign In Button */}
            <div className="mt-8">
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
                    Loading...
                  </span>
                ) : (
                  "LOG IN"
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;