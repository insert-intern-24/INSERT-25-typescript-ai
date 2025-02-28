import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilePage from "@/pages/file";
import IndexPage from "@/pages/index/ui";


const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/file",
    element: <FilePage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
