import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import AuthRedirect from "./component/AuthRedirect";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux"; // Import the Provider from react-redux
import store from "../redux/store"; // Import your Redux store

import Register from "./component/Register";
import NotFound from "./component/NotFound";
import Login from "./component/login/index.jsx";
import Welcome from "./component/Welcome/index.jsx";
import Home from "./component/Home/index.jsx";
import DisplayUsers from "./component/DisplayUsers";
import StatusUsers from "./component/StatusUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthRedirect>
        <Register />
      </AuthRedirect>
    ),
  },
  {
    path: "/welcome",
    element: <ProtectedRoute element={<Welcome />} />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/users",
    element: <ProtectedRoute element={<DisplayUsers />} />,
  },
  {
    path: "/status",
    element: <ProtectedRoute element={<StatusUsers />} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = document.getElementById("root");
const reactDOM = ReactDOM.createRoot(root);
reactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
