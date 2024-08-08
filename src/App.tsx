import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import DefaultLayout from "./layouts/DefaultLayout";
import PokemonsPage from "./pages/pokemons/PokemonsPage";
import DetailPage from "./pages/pokemons/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <PokemonsPage />
      },
      {
        path: ':pokemonName',
        element: <DetailPage />
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
