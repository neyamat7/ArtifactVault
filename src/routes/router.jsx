import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts";
import AddArtifact from "../pages/AddArtifact/AddArtifact";
import ArtifactDetails from "../pages/ArtifactDetails/ArtifactDetails";
import Artifacts from "../pages/Artifacts/Artifacts";
import Home from "../pages/Home/Home";
import LikedArtifacts from "../pages/LikedArtifacts/LikedArtifacts";
import Login from "../pages/Login/Login";
import MyArtifacts from "../pages/MyArtifacts/MyArtifacts";
import Register from "../pages/Register/Register";
import Update from "../pages/Update/Update";

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
        path: "artifacts",
        element: <Artifacts />,
      },
      {
        path: "my-artifacts",
        element: <MyArtifacts />,
      },
      {
        path: "liked-artifacts",
        element: <LikedArtifacts />,
      },
      {
        path: "artifacts/:artifactId",
        element: <ArtifactDetails />,
      },
      {
        path: "update/:taskId",
        element: <Update />,
      },
    ],
  },
]);
