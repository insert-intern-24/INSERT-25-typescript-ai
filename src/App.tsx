import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilePage from "@/pages/file";
import IndexPage from "@/pages/index/ui";
import WritePage from "@/pages/write/ui";


const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/file",
    element: <FilePage />,
  },
  {
    path: "/write/:hashed_id",
    element: <WritePage />,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
