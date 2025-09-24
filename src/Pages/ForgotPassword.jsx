import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Background from "../Components/Background";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      console.log("Form Submitted:", values);
      // simulate async
      setTimeout(() => {setLoading(false), resetForm(), navigate('/VerifyOtp'), toast.success('Otp sent successfully')}, 800);
    },
  });

  return (
    <Background>
     <div className="flex items-center justify-center min-h-screen px-4">
  <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">
    <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
      Forgot Password
    </h2>
    <p className="text-center text-gray-600 mb-6">
      Enter your registered email address. <br />
      We will send you an OTP to reset your password.
    </p>

    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
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
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {formik.errors.email}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center bg-indigo-500 text-white font-semibold py-3 rounded-xl text-lg transition ${
          loading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-indigo-600 active:scale-95"
        }`}
      >
        {loading ? (
          <span className="loader border-2 border-t-transparent border-white rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          "Send OTP"
        )}
      </button>
    </form>

    {/* Back to Login */}
    <p className="mt-6 text-center text-gray-600 text-sm">
      Remembered your password?{" "}
      <button    onClick={() => navigate('/login')} className="text-indigo-500 font-medium hover:underline">
        Back to Login
      </button>
    </p>
  </div>
</div>

    </Background>
  );
};

export default ForgotPassword;
