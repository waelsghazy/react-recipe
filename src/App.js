import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CuisinePage from './pages/CuisinePage';
import Layout from './Layout';
import Searched from './pages/Searched';
import RecipeDetailsPage from './pages/RecipeDetailsPage'

function App() {
  const routers = createBrowserRouter([
    {path: '/', element: <Layout />, children: [
      {index: true, element: <Home />},
      {path: '/cuisine/:type', element: <CuisinePage />},
      {path: '/searched/:search', element: <Searched />},
      {path: '/recipeDetails/:id', element: <RecipeDetailsPage />},
    ]}
  ])
  return (
      <RouterProvider router={routers} />
  )
}

export default App
