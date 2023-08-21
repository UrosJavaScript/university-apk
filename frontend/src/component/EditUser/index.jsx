import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const EditUser = ({ userId, formData: initialFormData, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const isFormDataChanged =
        formData.username !== initialFormData.username ||
        formData.email !== initialFormData.email ||
        formData.password !== initialFormData.password ||
        formData.permission !== initialFormData.permission;

      if (!isFormDataChanged) {
        window.alert("You need to edit the field before saving.");
        return;
      }

      const updateEndpoint = `http://localhost:8081/updateUsers/${userId}`;

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
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="permission"
            >
              ROLE
            </label>
            <input
              type="text"
              name="permission"
              value={formData.permission}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Passwrod
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
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

EditUser.propTypes = {
  userId: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditUser;
