import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import XSvg from "../../../components/svgs/X";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const stepLabels = [
    "Sign up your account",
    "Set up your workspace",
    "Set up your profile",
  ];

  return (
    <div className="flex h-screen bg-black">
      {/* Left side */}
      <div className="w-1/2 hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 via-purple-700 to-purple-900 relative p-8">
        <div className="mb-6">
          <XSvg className="w-16 h-16 fill-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Get Started with Us</h1>
        <p className="text-white text-center mb-12">Complete these easy steps to register your account.</p>

        <div className="w-full max-w-md">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center p-4 mb-4 rounded-lg transition-all duration-300 cursor-default ${
                activeStep === step
                  ? "bg-black bg-opacity-25"
                  : "bg-black bg-opacity-25"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-colors ${
                  activeStep === step
                    ? "bg-black bg-opacity-25"
                    : "bg-black bg-opacity-25"
                }`}
              >
                <span className="font-bold">{step}</span>
              </div>
              <span
                className={`font-medium transition-colors duration-200 ${
                  activeStep === step ? "text-white" : "text-gray-300"
                }`}
              >
                {stepLabels[step - 1]}
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
          <h2 className="text-2xl font-bold text-white mb-2">Sign Up Account</h2>
          <p className="text-gray-400 mb-6">Enter your personal data to create your account.</p>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700"></div>
            <p className="mx-4 text-gray-400">Or</p>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-white mb-2 font-medium">Username</label>
                <div className="rounded-lg flex items-center gap-3 bg-gray-800 p-4 border border-transparent hover:border-purple-500 focus-within:border-purple-500 transition-colors">
                  <FaUser className="text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    required
                    className="grow bg-transparent focus:outline-none text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-white mb-2 font-medium">Full Name</label>
                <div className="rounded-lg flex items-center gap-3 bg-gray-800 p-4 border border-transparent hover:border-purple-500 focus-within:border-purple-500 transition-colors">
                  <MdDriveFileRenameOutline className="text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="grow bg-transparent focus:outline-none text-white placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Email</label>
              <div className="rounded-lg flex items-center gap-3 bg-gray-800 p-4 border border-transparent hover:border-purple-500 focus-within:border-purple-500 transition-colors">
                <MdOutlineMail className="text-gray-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                  className="grow bg-transparent focus:outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Password</label>
              <div className="rounded-lg flex items-center gap-3 bg-gray-800 p-4 border border-transparent hover:border-purple-500 focus-within:border-purple-500 transition-colors relative">
                <MdPassword className="text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  className="grow bg-transparent focus:outline-none text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-1">Must be at least 8 characters.</p>
            </div>

            <button
              type="submit"
              className="w-full btn rounded-lg btn-primary text-white py-4 mt-4 bg-purple-600 hover:bg-purple-700 border-none shadow-lg transition-all"
              disabled={isPending}
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </button>
            {isError && <p className="text-red-500 text-center font-medium">{error.message}</p>}
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
