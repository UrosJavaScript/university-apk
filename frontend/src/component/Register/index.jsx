import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerUserAsync } from "../../../redux/authActions";
import { Audio } from "react-loader-spinner";

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation function
const isValidPassword = (password) => {
  // Password must have at least 10 characters and contain a combination of uppercase and lowercase letters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
  return passwordRegex.test(password);
};

const Register = () => {
  const dispatch = useDispatch();
  const registrationError = useSelector(
    (state) => state.auth.registrationError
  );
  const loading = useSelector((state) => state.auth.loading);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log("Form errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    // Dispatch the registerUserAsync action with the user data
    dispatch(registerUserAsync(userData))
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("Registration failed: ", err);
      });
  };

  const validateForm = () => {
    let errors = {};
    if (!username) {
      errors.username = "Please enter your username.";
    }
    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Please enter your password.";
    } else if (!isValidPassword(password)) {
      errors.password =
        "Password must have at least 10 characters and contain a combination of uppercase and lowercase letters.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center bg-[#0f0f1c] h-screen w-full items-center">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">
        Register User
      </h1>

      {/* Show registration error */}
      {registrationError && (
        <p className="text-red-500 text-xs pb-3 max-w-[200px]">{registrationError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
          />
        </div>

        {errors.username && (
          <p className="text-red-500 text-xs pb-3 max-w-[200px]">{errors.username}</p>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs pb-3 max-w-[200px]">{errors.email}</p>
        )}

        {/* Password field */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-200 text-sm font-bold mb-1"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute bottom-2 right-2"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-gray-600 cursor-pointer"
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs pb-3 max-w-[200px]">{errors.password}</p>
        )}

        {/* Confirm Password field */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-200 text-sm font-bold mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute bottom-2 right-2"
            onClick={toggleConfirmPasswordVisibility}
          >
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="text-gray-600 cursor-pointer"
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs pb-3 max-w-[200px]">{errors.confirmPassword}</p>
        )}

        {/* Add other form inputs as needed */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          disabled={loading}
        >
          {loading ? (
            <>
              <Audio
                height={20}
                width={20}
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className=" text-white text-center mt-6">
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default Register;
