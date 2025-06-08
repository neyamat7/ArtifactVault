import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts";
import AddArtifact from "../pages/AddArtifact/AddArtifact";
import ArtifactDetails from "../pages/ArtifactDetails/ArtifactDetails";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    errorElement: <h1>this is an error</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-artifact",
        element: <AddArtifact />,
      },
      {
        path: "browse-task",
        element: <h1>this is browse task</h1>,
      },
      {
        path: "my-tasks",
        element: <h1>this is my tasks</h1>,
      },
      {
        path: "details/:artifactId",
        element: <ArtifactDetails />,
      },
      {
        path: "update/:taskId",
        element: <h1>this is update task</h1>,
      },
    ],
  },
]);
