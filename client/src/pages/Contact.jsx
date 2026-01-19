import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/public/new-contact", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--color-background) flex flex-col items-center px-4 py-10">

      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-(--color-primary)">
          Contact Us 📬
        </h1>
        <p className="mt-2 text-(--color-text)/70">
          Have a question? Reach out and we'll get back to you fast!
        </p>
      </div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between">
          <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-4">

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

            <textarea
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-(--color-primary)/20 focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/30 outline-none transition disabled:bg-gray-100 resize-none"
            />

            <div className="flex gap-4 pt-4">
              <button
                type="reset"
                disabled={isLoading}
                className="flex-1 py-3 rounded-lg font-semibold text-(--color-primary) bg-(--color-primary)/10 hover:bg-(--color-primary)/20 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 rounded-lg font-bold text-white bg-(--color-secondary) hover:bg-(--color-secondary-hover) shadow-lg transition transform hover:scale-105 disabled:scale-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info / Map / Extras */}
        <div className="flex flex-col justify-around gap-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-2 hover:shadow-lg transition">
            <h3 className="font-bold text-(--color-primary)">📍 Our Location</h3>
            <p className="text-(--color-text)/80">21,Ayodhya Bypass,Bhopal,India</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-2 hover:shadow-lg transition">
            <h3 className="font-bold text-(--color-primary)">📞 Call Us</h3>
            <p className="text-(--color-text)/80">+91 9755784190</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-2 hover:shadow-lg transition">
            <h3 className="font-bold text-(--color-primary)">✉ Email</h3>
            <p className="text-(--color-text)/80">support@cravings.com</p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-(--color-text)/60 mt-8 text-sm">
        🔒 We respect your privacy. All fields are mandatory.
      </p>
    </div>
  );
};

export default Contact;
