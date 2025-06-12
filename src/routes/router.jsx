import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/ErrorsPage/ErrorsPage";
import Layouts from "../Layouts";
import AboutUs from "../pages/AboutUs/AboutUs";
import AddArtifact from "../pages/AddArtifact/AddArtifact";
import ArtifactDetails from "../pages/ArtifactDetails/ArtifactDetails";
import Artifacts from "../pages/Artifacts/Artifacts";
import Home from "../pages/Home/Home";
import LikedArtifacts from "../pages/LikedArtifacts/LikedArtifacts";
import Login from "../pages/Login/Login";
import MyArtifacts from "../pages/MyArtifacts/MyArtifacts";
import Register from "../pages/Register/Register";
import Update from "../pages/Update/Update";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoutes>
            <MyArtifacts />
          </PrivateRoutes>
        ),
      },
      {
        path: "liked-artifacts",
        element: (
          <PrivateRoutes>
            <LikedArtifacts />
          </PrivateRoutes>
        ),
      },
      {
        path: "artifacts/:artifactId",
        element: (
          <PrivateRoutes>
            <ArtifactDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "update/:artifactId",
        element: (
          <PrivateRoutes>
            <Update />
          </PrivateRoutes>
        ),
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
      },
    ],
  },
]);
