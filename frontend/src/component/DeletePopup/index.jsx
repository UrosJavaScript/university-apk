import PropTypes from "prop-types";

const DeletePopup = ({ userName, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Delete User</h2>
        <p className="mb-4">
          Are you sure you want to delete the user: {userName}?
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeletePopup.propTypes = {
  userName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeletePopup;
