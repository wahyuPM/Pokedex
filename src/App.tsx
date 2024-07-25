import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import DefaultLayout from "./layouts/DefaultLayout";
import PokemonsPage from "./pages/pokemons/PokemonsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <PokemonsPage />
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
