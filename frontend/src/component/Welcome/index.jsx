import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLoggedInUser } from "../../../redux/authActions";
import Formular from "../Formular";
import Home from "../Home";
import { Audio } from "react-loader-spinner";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in on component mount
    dispatch(checkLoggedInUser())
      .then((loggedIn) => {
        if (!loggedIn) {
          navigate("/login"); // Redirect to login if not logged in
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error while checking logged in user:", error);
        setLoading(false);
      });
  }, [dispatch, navigate]);

  const userData = useSelector((state) => state.auth.userData);
  const formData = useSelector((state) => state.formular.formData);

  // If still loading, you can show a loading indicator
  if (loading) {
    return (
      <>
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
      </>
    );
  }

  if (!userData) {
    navigate("/login"); // Redirect to login if not logged in
    return null;
  }

  const filteredFormData =
    userData.permission === "user"
      ? formData
      : formData.filter((form) => form.email === userData.email);

  let imgBg =
    "https://images.pexels.com/photos/249360/pexels-photo-249360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    // <div>
    <div
      className="flex items-center h-screen justify-center gap-6 w-full "
      style={{
        backgroundImage: `url(${imgBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      {userData.permission === "user" ? (
        <>
          <div className="flex flex-col-reverse gap-8">
            <Formular />

            {filteredFormData ? ( // Show the link only if filteredFormData is not empty
              <button>
                <Link
                  to="/home"
                  className="bg-orange-500 px-4 py-1 border-2 rounded"
                >
                  See which exams you have registered for
                </Link>
              </button>
            ) : (
              <>Nista</>
            )}
          </div>
        </>
      ) : (
        <>
          {/* <HeaderNavigationLoggin /> */}
          <div className="flex flex-col bg-black">
            <div className="text-center pt-4">
              <p className=" text-lg text-white">
                As an admin, you can edit and delete users, as well as change
                the status of the registered exam
              </p>
            </div>
            <div className="flex flex-col">
              <Home key="admin" />
            </div>
          </div>
        </>
      )}
    </div>
    // </div>
  );
};

export default Welcome;
