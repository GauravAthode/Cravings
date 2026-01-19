import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be more than 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only letters A-Z and spaces allowed";
    }

    if (!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(formData.email)) {
      Error.email = "Use proper email format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian mobile numbers allowed";
    }

    if (formData.password !== formData.confirmPassword) {
      Error.confirmPassword = "Passwords do not match";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Please fill the form correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
      setTimeout(() => navigate("/login"),1000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-background) px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-(--color-primary) text-center">
          Create Account
        </h2>
        <p className="text-center text-(--color-text)/70 mt-2 mb-8">
          Sign up to start ordering your favorite food
        </p>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="w-full px-4 py-3 rounded-lg border border-(--color-primary)/20 focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/30 outline-none transition disabled:bg-gray-100"
          />
          {validationError.fullName && (
            <p className="text-xs text-red-500">{validationError.fullName}</p>
          )}

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
          {validationError.email && (
            <p className="text-xs text-red-500">{validationError.email}</p>
          )}

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            maxLength="10"
            value={formData.mobileNumber}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="w-full px-4 py-3 rounded-lg border border-(--color-primary)/20 focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/30 outline-none transition disabled:bg-gray-100"
          />
          {validationError.mobileNumber && (
            <p className="text-xs text-red-500">{validationError.mobileNumber}</p>
          )}

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="w-full px-4 py-3 rounded-lg border border-(--color-primary)/20 focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/30 outline-none transition disabled:bg-gray-100"
          />
          {validationError.confirmPassword && (
            <p className="text-xs text-red-500">{validationError.confirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-bold text-white bg-(--color-secondary) hover:bg-(--color-secondary-hover) shadow-lg transition transform hover:scale-105 disabled:scale-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-4">
          <p className="text-sm text-(--color-text)/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-(--color-secondary) hover:text-(--color-secondary-hover)"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-(--color-text)/60 mt-6">
          🔒 Your information is safe with us
        </p>
      </div>
    </div>
  );
};

export default Register;
