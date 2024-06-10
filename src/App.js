import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import List from "./components/List";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: "/", element: <List /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
