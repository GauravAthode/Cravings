import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useAuth } from "../context/AuthContext";
import ForgetPasswordModal from "../components/publicModals/ForgetPasswordModal";

const Login = () => {
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      handleClearForm();

      switch (res.data.data.role) {
        case "manager":
          setRole("manager");
          navigate("/resturant-dashboard");
          break;
        case "partner":
          setRole("partner");
          navigate("/rider-dashboard");
          break;
        case "customer":
          setRole("customer");
          navigate("/user-dashboard");
          break;
        case "admin":
          setRole("admin");
          navigate("/admin-dashboard");
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-(--color-background) px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-(--color-primary) text-center">
            Welcome Back
          </h2>
          <p className="text-center text-(--color-text)/70 mt-2 mb-8">
            Login to continue ordering delicious food
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 rounded-lg border border-(--color-primary)/20 focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/30 outline-none transition disabled:bg-gray-100"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 rounded-lg border border-(--color-primary)/20 focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/30 outline-none transition disabled:bg-gray-100"
            />

            

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-bold text-white bg-(--color-secondary) hover:bg-(--color-secondary-hover) shadow-lg transition transform hover:scale-105 disabled:scale-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {/* Forget Password */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsForgetPasswordOpen(true)}
                className="text-center text-sm font-medium text-(--color-primary) hover:text-(--color-secondary)"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-(--color-text)/70">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-(--color-secondary) hover:text-(--color-secondary-hover)"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <p className="text-xs text-center text-(--color-text)/60 mt-6">
            🔒 Secure login · Trusted by food lovers
          </p>
        </div>
      </div>

      {isForgetPasswordOpen && (
        <ForgetPasswordModal
          onClose={() => setIsForgetPasswordOpen(false)}
        />
      )}
    </>
  );
};

export default Login;
