import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Write from '@/pages/write/ui/index.tsx';

const router = createBrowserRouter([
  {
    path: '/write',
    element: <Write />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}