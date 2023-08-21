import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import PropTypes from "prop-types";
import moment from "moment";

const EditPopup = ({ userId, formData: initialFormData, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);
  const userData = useSelector((state) => state.auth.userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const isFormDataChanged =
        formData.name !== initialFormData.name ||
        formData.email !== initialFormData.email ||
        formData.phone !== initialFormData.phone ||
        formData.form_name !== initialFormData.form_name ||
        formData.form_status !== initialFormData.form_status;

      if (!isFormDataChanged) {
        window.alert("You need to edit the field before saving.");
        return;
      }

      const createdAt = moment(formData.created_at);
      const currentTime = moment();
      const timeDifference = currentTime.diff(createdAt);

      const duration = moment.duration(timeDifference);
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      const waitingTimeValue = moment()
        .startOf("day") // Set the date to today and time to 00:00:00
        .add(hours, "hours")
        .add(minutes, "minutes")
        .add(seconds, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");

      formData.waiting_time = waitingTimeValue;

      // end

      const updateEndpoint = `http://localhost:8081/updateFormData/${userId}`;

      const response = await axios.put(updateEndpoint, formData);

      console.log("Server Response:", response.data);

      onClose();

      window.location.reload();

      window.alert("Success editing!");
    } catch (error) {
      console.error("Error while updating data:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                userData.permission === "user"
                  ? "disabled:opacity-75 cursor-not-allowed"
                  : ""
              }`}
              disabled={userData.permission === "user"}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="form_name"
            >
              Name of exam
            </label>
            <input
              type="text"
              name="form_name"
              value={formData.form_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="form_status"
            >
              Status of Exam
            </label>
            <input
              type="text"
              name="form_status"
              value={formData.form_status}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                userData.permission === "user"
                  ? "disabled:opacity-75 cursor-not-allowed"
                  : ""
              }`}
              disabled={userData.permission === "user"}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Define prop types for the EditPopup component
EditPopup.propTypes = {
  userId: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPopup;
