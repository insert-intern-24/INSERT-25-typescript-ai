import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilePage from "@/pages/write/file/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilePage />,
  },
  {
    path: "/write",
    element: <FilePage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
