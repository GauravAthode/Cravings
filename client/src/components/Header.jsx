import React from "react";
import tranparentLogo from "../assets/transparentLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin,role } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (role) {
      case "manager": {
        navigate("/resturant-dashboard");
        break;
      }
      case "partner": {
        navigate("/rider-dashboard");
        break;
      }
      case "customer": {
        navigate("/user-dashboard");
        break;
      }
      case "admin": {
        navigate("/admin-dashboard");
        break;
      }
      default:
        break;
    }
  };
  

  return (
    <header className="bg-(--color-primary) sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={"/"} className="flex items-center">
            <img
              src={tranparentLogo}
              alt="Logo"
              className="h-12 w-24 object-cover invert-100 transition-transform transform hover:scale-105"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-white font-medium">
            <Link
              to={"/"}
              className="relative group px-2 py-1 hover:text-(--color-accent) transition"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-accent) group-hover:w-full transition-all"></span>
            </Link>
            <Link
              to={"/about"}
              className="relative group px-2 py-1 hover:text-(--color-accent) transition"
            >
              About
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-accent) group-hover:w-full transition-all"></span>
            </Link>
            <Link
              to={"/contact"}
              className="relative group px-2 py-1 hover:text-(--color-accent) transition"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-accent) group-hover:w-full transition-all"></span>
            </Link>
            <Link
            to={"/orderNowCopy"}
            className="relative group px-2 py-1 hover:text-(--color-accent) transition"
          >
            Order Now
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-accent) group-hover:w-full transition-all"></span>
          </Link>
          </nav>

          {/* Buttons */}
          <div className="flex gap-4">
            {isLogin ? (
              <div
                className="text-orange-500  hover:scale-110 cursor-pointer"
                onClick={handleNavigate}
              >
                {user.fullName}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="py-2 px-4 font-bold rounded-lg bg-(--color-secondary) hover:bg-(--color-secondary-hover) hover:scale-105 transition transform shadow-md text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="py-2 px-4 font-bold rounded-lg bg-(--color-secondary) hover:bg-(--color-secondary-hover) hover:scale-105 transition transform shadow-md text-white"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
