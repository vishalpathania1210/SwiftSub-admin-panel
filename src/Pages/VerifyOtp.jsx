import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Background from "../Components/Background";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be 6 digits"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://swiftsub-psi.vercel.app/v1/auth/verify-otp`,
          {
            params: {
              otp: values.otp,
              email: values.email,
            },
          }
        );

        console.log("Verify OTP response:", response.data);

        if (response.data.success) {
          toast.success("OTP verified successfully");
          resetForm();
          navigate("/ResetPassword");
        } else {
          toast.error(response.data.message || "Invalid OTP");
        }
      } catch (error) {
        console.error("Verify OTP error:", error);
        toast.error("OTP verification failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Background>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
            Verify OTP
          </h2>
          <p className="text-center font-serif text-gray-600 mb-6">
            We’ve sent a 6-digit OTP to your email. <br />
            Please enter your email and OTP below.
          </p>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-serif text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`block w-full px-4 py-3 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                placeholder="you@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-serif text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
                className={`block w-full px-4 py-3 border ${
                  formik.touched.otp && formik.errors.otp
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base text-center tracking-widest`}
                placeholder="______"
              />
              {formik.touched.otp && formik.errors.otp && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.otp}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-indigo-500 text-white font-serif py-3 rounded-xl text-lg transition ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-indigo-600 active:scale-95"
              }`}
            >
              {loading ? (
                <span className="loader border-2 border-t-transparent border-white rounded-full w-6 h-6 animate-spin"></span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          {/* Extra options */}
          <div className="mt-6 flex flex-col items-center space-y-3">
            <p className="text-center font-serif text-gray-600 text-sm">
              Remembered your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-500 font-serif hover:underline"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default VerifyOtp;
