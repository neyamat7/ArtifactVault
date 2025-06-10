import { motion } from "framer-motion";

const charLengthCheck = /^.{6,}$/;
const uppercaseCheck = /[A-Z]/;
const lowercaseCheck = /[a-z]/;

const errorMsg = (text) => (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-2 text-sm text-red-600"
  >
    {text}
  </motion.p>
);

export const validateForm = (formData, setErrors) => {
  const { name, email, password, confirmPassword, photoURL, terms } = formData;

  if (!name) {
    setErrors((prev) => ({
      ...prev,
      name: errorMsg("Required!"),
    }));
    return false;
  }

  if (!email) {
    setErrors((prev) => ({
      ...prev,
      email: errorMsg("Please provide your email!"),
    }));
    return false;
  }

  if (!password) {
    setErrors((prev) => ({
      ...prev,
      password: errorMsg("Please provide your Password!"),
    }));
    return false;
  } else if (!charLengthCheck.test(password)) {
    setErrors((prev) => ({
      ...prev,
      password: errorMsg("Password must be at least 6 characters long!"),
    }));
    return false;
  } else if (!uppercaseCheck.test(password)) {
    setErrors((prev) => ({
      ...prev,
      password: errorMsg(
        "Password must contain at least one uppercase letter!"
      ),
    }));
    return false;
  } else if (!lowercaseCheck.test(password)) {
    setErrors((prev) => ({
      ...prev,
      password: errorMsg(
        "Password must contain at least one lowercase letter!"
      ),
    }));
    return false;
  }

  if (!confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: errorMsg("Please confirm your password!"),
    }));
    return false;
  } else if (password !== confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: errorMsg("Passwords do not match!"),
    }));
    return false;
  }

  if (!photoURL) {
    setErrors((prev) => ({
      ...prev,
      photoURL: errorMsg("Oops! Don’t forget to add your photo URL!"),
    }));
    return false;
  }

  if (!terms) {
    setErrors((prev) => ({
      ...prev,
      terms: errorMsg("You must accept the Terms and Conditions!"),
    }));
    return false;
  }

  return true;
};
