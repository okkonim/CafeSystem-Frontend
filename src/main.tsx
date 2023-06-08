
import React from 'react'
import ReactDOM from 'react-dom/client'
// router
import { RouteObject, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
// store
import { Provider } from 'react-redux'
import store from './store/store'
// styles
import './assets/styles/main.scss'
// pages
import Products from './pages/Products'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import LogIn from './pages/LogIn'
import CreateProduct from './pages/CreateProduct'
import Register from './pages/Register'
import ViewProduct from './pages/ViewProduct'
import Forgot from './pages/ForgotPassword'
import EditProduct from './pages/EditProduct'
import Main from './pages/Main'

const routes: RouteObject[] = [
  {
    path: '/',
    id: 'main',
    element: <Main />
  }, {
    path: '/products',
    id: 'products',
    element: <Products />
  }, {
    path: '/orders',
    id: 'orders',
    element: <Orders />
  }, {
    path: '/profile',
    id: 'profile',
    element: <Profile />
  }, {
    path: '/login',
    id: 'login',
    element: <LogIn />
  }, {
    path: '/forgot',
    id: 'forgot',
    element: <Forgot />
  }, {
    path: '/register',
    id: 'register',
    element: <Register />
  }, {
    path: '/create',
    id: 'create',
    element: <CreateProduct />
  }, {
    path: '/edit/:productID',
    id: 'edit',
    element: <EditProduct />
  }, {
    path: '/product/:productID',
    id: 'product',
    element: <ViewProduct />
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
