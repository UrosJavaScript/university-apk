import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFormData,
  deleteFormDataAsync,
} from "../../../redux/formularActions";
import HeaderNavigationLoggin from "../HeaderNavigationLoggin"; // Import the Header component
import EditPopup from "../EditPopup";
import DeletePopup from "../DeletePopup";
import { Audio } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      // Reload the page after successful delete
      window.location.reload();
    }
  }, [deleteSuccess]);

  const formData = useSelector((state) => state.formular.formData);
  const userData = useSelector((state) => state.auth.userData);

  if (!formData) {
    return (
      <div className="flex h-screen items-center justify-center w-full">
        <Audio
          height={80}
          width={80}
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const filteredFormData =
    userData.permission === "admin"
      ? formData
      : formData.filter((form) => form.email === userData.email);

  const handleEditClick = (userId) => {
    const selectedUser = filteredFormData.find((user) => user.id === userId);
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
      setSelectedUserData(selectedUser);
      setShowEditPopup(true);
    }
  };

  const handleDeleteClick = (userId) => {
    const selectedUser = filteredFormData.find((user) => user.id === userId);
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
      setSelectedUserData(selectedUser);
      setShowDeletePopup(true); // Open the delete popup
    }
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteFormDataAsync(selectedUserId))
      .then(() => {
        // console.log("User successfully deleted.");
        setDeleteSuccess(true); // Set the delete success state to true
        setShowDeletePopup(false); // Close the delete popup
      })
      .catch((error) => {
        console.log("Error while deleting user:", error);
      });
  };

  const handleDeleteCanceled = () => {
    setShowDeletePopup(false); // Close the delete popup
  };

  // Dodajemo uslov za prikaz teksta kada je tabela prazna
  if (filteredFormData.length === 0) {
    return (
      <div className="flex w-full flex-col text-center">
        <HeaderNavigationLoggin />
        <p className="text-2xl text-gray-500 mt-10 font-semibold">
          You have not filled out any form yet!
        </p>
      </div>
    );
  }

  return (
    <>
      <HeaderNavigationLoggin />

      {/* Conditionally render the EditPopup component */}
      {showEditPopup && selectedUserData && (
        <EditPopup
          userId={selectedUserId}
          formData={selectedUserData}
          onClose={() => {
            setShowEditPopup(false);
            setSelectedUserData(null);
          }}
        />
      )}

      {/* Conditionally render the DeletePopup component */}
      {showDeletePopup && selectedUserData && (
        <DeletePopup
          userName={selectedUserData.name}
          onConfirm={handleDeleteConfirmed}
          onCancel={handleDeleteCanceled}
        />
      )}

      {userData.permission === "user" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFormData.map((form) => (
                <tr key={form.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.form_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.form_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 items-center">
                    <button
                      onClick={() => handleEditClick(form.id)}
                      className="bg-green-500 px-4 py-1 rounded text-white"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDeleteClick(form.id)}
                      className="bg-red-500 px-4 py-1 rounded text-white"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-x-auto ">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFormData.map((form) => (
                  <tr key={form.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.form_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.form_status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 items-center">
                      <button
                        onClick={() => handleEditClick(form.id)}
                        className="bg-green-500 px-4 py-1 rounded text-white"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteClick(form.id)}
                        className="bg-red-500 px-4 py-1 rounded text-white"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
