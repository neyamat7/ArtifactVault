import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

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
        element: <h1>this is register</h1>,
      },
      {
        path: "add-task",
        element: <h1>this is add task</h1>,
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
        path: "details/:taskId",
        element: <h1>this is task details</h1>,
      },
      {
        path: "update/:taskId",
        element: <h1>this is update task</h1>,
      },
    ],
  },
]);
