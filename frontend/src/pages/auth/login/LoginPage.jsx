import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import XSvg from "../../../components/svgs/X";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const { mutate: loginMutation, isError, isLoading, error } = useMutation({
    mutationFn: async ({ username, password }) => {
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
    <div className="flex h-screen bg-black">
      {/* Left side */}
      <div className="w-1/2 hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 relative p-8">
        <div className="mb-6">
          <XSvg className="w-16 h-16 fill-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white text-center mb-12">
          Enter your credentials to access your account.
        </p>

        <div className="w-full max-w-md">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center p-4 mb-4 rounded-lg transition-all duration-300 cursor-default bg-black bg-opacity-25`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-black bg-opacity-50 text-white">
                <span className="font-bold">{step}</span>
              </div>
              <span className="font-medium text-gray-300">
                {step === 1
                  ? "Login to your account"
                  : step === 2
                  ? "Explore the dashboard"
                  : "Enjoy the platform"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-6">
            <XSvg className="w-16 h-16 fill-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Log In</h2>
          <p className="text-gray-400 mb-6">Access your account securely</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username or Email */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Email or Username
              </label>
              <div className="rounded-lg flex items-center gap-3 bg-gray-800 p-4 border border-transparent hover:border-blue-500 focus-within:border-blue-500 transition-colors">
                <MdOutlineMail className="text-gray-400 text-xl" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your email or username"
                  required
                  className="grow bg-transparent focus:outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Password
              </label>
              <div className="rounded-lg flex items-center gap-3 bg-gray-800 p-4 border border-transparent hover:border-blue-500 focus-within:border-blue-500 transition-colors">
                <MdPassword className="text-gray-400 text-xl" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="grow bg-transparent focus:outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Error Message */}
            {isError && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded">
                {error.message}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn rounded-lg text-white py-4 mt-4 bg-blue-600 hover:bg-blue-700 border-none shadow-lg transition-all"
            >
              {isLoading ? "Logging in..." : "LOG IN"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
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
