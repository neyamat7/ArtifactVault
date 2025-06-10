import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  HiEye,
  HiEyeOff,
  HiLockClosed,
  HiMail,
  HiPhotograph,
  HiUser,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import registerLottie from "../../assets/lotties/register.json";
import Button from "../../components/Button/Button";
import useAuth from "../../context/AuthContext/AuthContext";
import { validateForm } from "../../utils/Validation";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const { createUser, setUser, updateUser, googleSignIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "terms" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    const isValid = validateForm(formData, setErrors);

    if (!isValid) return;

    // create new user
    createUser(email, password).then((res) => {
      const user = res.user;
      updateUser({ displayName: name, photoURL: photoURL })
        .then(() => {
          setUser({ ...user, displayName: name, photoURL: photoURL });
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleGoogleRegister = () => {
    // Google register logic would go here
    console.log("Google register attempt");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Animation and Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-center justify-center text-center p-8"
        >
          <div className="w-80 h-80 mb-8">
            <Lottie
              animationData={registerLottie}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Join Our Community
            </h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-6">
              Historical Artifacts Tracker
            </h2>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Start your archaeological journey today. Discover, share, and
              preserve history with fellow enthusiasts worldwide.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="rounded-full p-2 shadow-lg bg-gradient-to-br from-amber-600 to-amber-700">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-800">
                  Historical Artifacts
                </h1>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Create Account
              </h2>
              <p className="text-slate-600">
                Join us and start exploring history!
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm">{errors.general}</p>
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-white"
                    }`}
                    placeholder="Enter your name"
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-white"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && errors.email}
              </div>

              {/* Photo URL Field */}
              <div>
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Photo URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiPhotograph className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    id="photoURL"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.photoURL
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-white"
                    }`}
                    placeholder="Enter your photo URL (optional)"
                  />
                </div>
                {errors.photoURL && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.photoURL}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-white"
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <HiEyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <HiEye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-white"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <HiEyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <HiEye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded mt-1"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-slate-700"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <div>{errors.terms && errors.terms}</div>

              {/* Create Account Button */}
              <Button
                type="submit"
                className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Register Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleRegister}
                className="w-full py-3 text-lg font-semibold border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
                Sign up with Google
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
