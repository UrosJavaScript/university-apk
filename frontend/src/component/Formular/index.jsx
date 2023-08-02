import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitFormAsync } from "../../../redux/formularActions";

const Formular = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.auth.userData.email);

  // Fetch the user's email from the Redux state
  //   const userEmail = useSelector((state) => state.auth.email);
  useEffect(() => {}, [userEmail]);

  const [formData, setFormData] = useState({
    name: "",
    email: userEmail,
    phone: "",
    form_name: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    let hasErrors = false;
    const newFormErrors = {};

    if (!formData.name.trim()) {
      newFormErrors.name = "Name is required.";
      hasErrors = true;
    }

    if (formData.email === "") {
      newFormErrors.email = "Email is empty!";
      hasErrors = true;
    } else if (formData.email !== userEmail) {
      newFormErrors.email = "Wrong email!";
      hasErrors = true;
    } else if (!isValidEmail(formData.email)) {
      newFormErrors.email = "Invalid email format.";
      hasErrors = true;
    }

    if (!formData.phone.trim()) {
      newFormErrors.phone = "Phone is required.";
      hasErrors = true;
    }

    if (!formData.form_name.trim()) {
      newFormErrors.form_name = "Name of exam is required.";
      hasErrors = true;
    }

    // If there are errors, set the state and return
    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    // If no errors, continue with form submission or API call
    dispatch(submitFormAsync(formData));

    if (!hasErrors) {
      navigate("/home");
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded bg-gray-100 ">
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Fill out the form and register for the exams
        </h2>
        <p className="py-6 italic text-zinc-400">
          You need to use the same email to submit your application. The form is
          mandatory for further steps.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm">{formErrors.phone}</p>
          )}
          <input
            type="text"
            name="form_name"
            placeholder="Name of exam"
            value={formData.form_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.form_name && (
            <p className="text-red-500 text-sm">{formErrors.form_name}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formular;
