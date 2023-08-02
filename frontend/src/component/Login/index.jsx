import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUserAsync, loginUserFailure } from "../../../redux/authActions";
import { Audio } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.auth.loginError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email and password are not empty
    if (!email || !password) {
      dispatch(loginUserFailure("Please enter both email and password."));
      return;
    }

    try {
      // Set loading state to true to show a loading indicator or disable the button
      setLoading(true);

      // Dispatch the loginUserAsync action to handle login
      await dispatch(loginUserAsync({ email, password }));

      // If there is no loginError, navigate to /welcome
      if (!loginError) {
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    } finally {
      // Set loading state to false after the login process is completed
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center bg-[#0f0f1c]  h-screen w-full items-center">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">
        Login User
      </h1>
      {/* Display login error */}
      {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
      <form onSubmit={handleSubmit}>
        {/* Username */}
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
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
        </div>

        {/* Password field */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-200 text-sm font-bold mb-1"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring 
             border-red-500"
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

        {/* Add other form inputs as needed */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          disabled={loading} // Disable the button while loading is true
        >
          {loading ? (
            <>
              <Audio
                height={10}
                width={10}
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className=" text-white text-center mt-6">
        <Link to="/register">Go to Register</Link>
      </div>
    </div>
  );
};

export default Login;
