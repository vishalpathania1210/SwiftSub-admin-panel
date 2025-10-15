import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Background from "../Components/Background";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [forgotToken, setForgotToken] = useState()

  useEffect(()=>{
const token = localStorage.getItem("forgot-password-token")
console.log("forgot token", token)
setForgotToken(token)
  },[])

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `https://swiftsub-psi.vercel.app/v1/auth/reset-password?token=${forgotToken}`,
          {
            password: values.password,
            confirmNewPassword: values.confirmPassword,
          }, // body data
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Password reset successfully, Please Login.");
          resetForm();
          localStorage.removeItem("forgot-password-token")
          navigate("/login");

        } else {
          toast.error(response.data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Reset failed");
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
            Reset Password
          </h2>
          <p className="text-center font-serif text-gray-600 mb-6">
            Enter your new password and confirm it to continue.
          </p>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-serif text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`block w-full px-4 py-3 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-serif text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`block w-full px-4 py-3 border ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Reset Button */}
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
                "Reset Password"
              )}
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-6 text-center font-serif text-gray-600 text-sm">
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
    </Background>
  );
};

export default ResetPassword;
