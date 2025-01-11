import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store.ts";
import "./index.scss";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";

import { Layout } from "./Layout.tsx";
const Qpick = lazy(() => import("./qpick.tsx"));
const Catalog = lazy(() => import("./pages/catalog/catalog.tsx"));
const Product = lazy(() => import("./pages/product/product.tsx"));
const Basket = lazy(() => import("./pages/basket/basket.tsx"));
const Register = lazy(() => import("./pages/register/register.tsx"));
const Profile = lazy(() => import("./pages/profile/profile.tsx"));
const Favorites = lazy(() => import("./pages/favorites/favorites.tsx"));
const AdminPanel = lazy(() => import("./pages/admin-panel/admin-panel.tsx"));
const ErrorPage = lazy(() => import("./pages/404/error.tsx"));
const Login = lazy(() => import('./pages/login/login.tsx'))



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Qpick /> }, 
      { path: "home", element: <Qpick /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:type", element: <Catalog /> },
      { path: "product/:id", element: <Product /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "favorites", element: <Favorites /> },
      { path: "basket", element: <Basket /> },
      { path: "adminpanel", element: <AdminPanel /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <div className="qpick-column">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
);
