import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import DefaultLayout from "./layouts/DefaultLayout";
import PokemonsPage from "./pages/pokemons/PokemonsPage";
import DetailPage from "./pages/pokemons/DetailPage";
import { queryClient } from './util/http.js';
import { QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
