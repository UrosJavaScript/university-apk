import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUsersAsync } from "../../../redux/authActions";
import HeaderNavigationLoggin from "../HeaderNavigationLoggin";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import EditUser from "../EditUser";
import DeletePopup from "../DeletePopup";

const DisplayUsers = () => {
  const dispatch = useDispatch();

  // State za čuvanje podataka korisnika koji se uređuje
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      // Reload the page after successful delete
      window.location.reload();
    }
  }, [deleteSuccess]);

  //const formData = useSelector((state) => state.formular.formData);
  const userData = useSelector((state) => state.auth.userData);
  const allUsers = useSelector((state) => state.auth.allUsers);

  // edit
  const handleEditUser = (userId) => {
    const selectedUser = allUsers.find((user) => user.id === userId);
    if (selectedUser) {
      setEditingUserId(selectedUser.id); // Postavite ID korisnika koji se uređuje
      setEditingUserData(selectedUser); // Postavite podatke korisnika za uređivanje
      setShowEditPopup(true); // Otvorite popup prozor za uređivanje
    }
  };

  //   delete
  const userDeleteClick = (userId) => {
    const selectedUser = allUsers.find((user) => user.id === userId);
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
      setSelectedUserData(selectedUser);
      setShowDeletePopup(true); // Open the delete popup
    }
  };
  const usersDeleteConfirmed = () => {
    dispatch(deleteUsersAsync(selectedUserId))
      .then(() => {
        // console.log("User successfully deleted.");
        setDeleteSuccess(true); // Set the delete success state to true
        setShowDeletePopup(false); // Close the delete popup
      })
      .catch((error) => {
        console.log("Error while deleting user:", error);
      });
  };

  const usersDeleteCanceled = () => {
    setShowDeletePopup(false); // Close the delete popup
  };

  if (!allUsers) {
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

  //   const filteredFormData =
  //     userData.permission === "admin"
  //       ? formData
  //       : formData.filter((form) => form.email === userData.email);

  return (
    <div className="flex bg-black flex-col">
      <>
        <HeaderNavigationLoggin />

        {showEditPopup && editingUserData && (
          <EditUser
            userId={editingUserId}
            formData={editingUserData}
            onClose={() => {
              setShowEditPopup(false);
              setEditingUserId(null);
              setEditingUserData(null);
            }}
          />
        )}

        {/* Conditionally render the DeletePopup component */}
        {showDeletePopup && selectedUserData && (
          <DeletePopup
            userName={selectedUserData.username}
            onConfirm={usersDeleteConfirmed}
            onCancel={usersDeleteCanceled}
          />
        )}

        {userData.permission === "admin" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UserName
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    role
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.permission}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 items-center">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="bg-green-500 px-4 py-1 rounded text-white"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => userDeleteClick(user.id)}
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
          <></>
        )}
      </>
    </div>
  );
};

export default DisplayUsers;
