import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth"; // Import AuthContext
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import LoginBG from "../../assets/loginBg.jpeg";
import KHlogo from "../../assets/Logo KH.png";
import "../../styles/App.css";

function Login() {
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // Call login function
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      //navigate("/nopanel"); // Redirect to home page after successful login
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const GotoRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      {/* Image Section */}
      <div className="w-1/2 relative">
  {/* Background Image */}
  <img
    src={LoginBG}
    alt="Background"
    className="h-full w-full object-cover"
  />

  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Centered Logo */}
  <div className="absolute inset-0 flex justify-center items-center">
    <img src={KHlogo} alt="Logo" />
  </div>
</div>



      {/* Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-[#FEFFFF]">
        <form
          onSubmit={handleSubmit}
          className="bg-white  p-6 w-3/4 max-w-screen-md"
        >
          <div className="heading flex flex-col">
            <h1
              className="poppins text-3xl font-extrabold  text-[#256CC2]"
              style={{ fontWeight: "800" }}
            >
              Login
            </h1>
            <p className="text-[#256CC2]">Welcome back! Lets get to work</p>
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state
              required
              className="w-full px-4 py-2 bg-[#ECECEC] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state
              required
              className="w-full px-4 py-2 bg-[#ECECEC] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            {/* Centered Button */}
            <button
              type="submit"
              className="w-[70%] mx-auto bg-[#256CC2] text-white font-bold py-2 rounded-lg hover:bg-[#256CC2] transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={GotoRegister}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Register here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
