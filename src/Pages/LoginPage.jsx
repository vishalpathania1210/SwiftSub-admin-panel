// src/Login.jsx
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Background from "../Components/Background";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      console.log("Form Submitted:", values);
      // simulate async
      setTimeout(() => setLoading(false), 800);
    },
  });

  return (

 <Background>
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden z-50">
        {/* LEFT: top dark-blue strip (logo + welcome) + form below */}
        <div className="w-full md:w-1/2 flex flex-col bg-indigo-50">
          {/* Dark top section: rounded top corners on mobile, only left-top on md+ */}
          <div className="w-full bg-indigo-900 text-white p-6 rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-3">
              {/* Logo box (white inside dark band) */}
              <div className="flex items-center justify-center w-20 h-12 rounded-xl bg-white">
                <span className="text-indigo-900 font-bold text-lg">ADMIN</span>
              </div>

              {/* Title + subtitle inside dark band */}
              <div>
                <h2 className="text-2xl font-bold leading-tight">Welcome Back!</h2>
                <p className="text-indigo-200 mt-1">Login in to continue</p>
              </div>
            </div>
          </div>

          {/* Form area (separate block below the dark strip) */}
          <div className="p-10">
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              {/* Username */}
              <div>
                <label className="block text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                ) : null}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                ) : null}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div /> {/* keep space on left so layout matches original */}
                <a href="#" className="text-indigo-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 text-white font-medium py-2 rounded-lg hover:bg-indigo-600 active:scale-95 transition duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* <p className="mt-6 text-gray-600 text-sm text-center md:text-left">
              Don’t have an account?{" "}
              <a href="#" className="text-indigo-500 font-medium hover:underline">
                Signup now
              </a>
            </p>

            <p className="text-xs text-gray-400 mt-8 text-center md:text-left">© 2021 mj business i</p> */}
          </div>
        </div>

        {/* RIGHT: Image (hidden on mobile; when hidden, the left section occupies full width) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
   </Background>
   
  );
};

export default LoginPage;
