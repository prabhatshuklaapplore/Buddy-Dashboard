// routes.js
import { Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Buddy from "../pages/Buddy/Buddy";
import Explorer from "../pages/Explorer/Explorer";
import Events from "../pages/Events/Events";
import FAQ from "../pages/FAQ/FAQ";
import CityDirectory from "../pages/CityDirectory/CityDirectory";
import Vendors from "../pages/Vendors/Vendors";
import Admins from "../pages/Admins/Admins";
import Subscriptions from "../pages/Subscriptions/Subscriptions";
import Payments from "../pages/Payments/Payments";
import EventCategories from "../pages/EventCategories/EventCategories";
import VenueFeatures from "../pages/VenueFeatures/VenueFeatures";
import Amenities from "../pages/Amenities/Amenities";
import Banners from "../pages/Banners/Banners";
import Venues from "../pages/Venues/Venues";
import TokenPoints from "../pages/Tokens/TokenPoints";
import OfflineAddon from "../pages/OfflineAddon/OfflineAddon";
import Addons from "../pages/Addon/Addons";
import Actionables from "../pages/Actionables/Actionables";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("token");
  return auth ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const auth = localStorage.getItem("token");
  return !auth ? children : <Navigate to="/" />;
}

const routes = [
  {
    path: "/",
    component: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    isPrivate: false,
  },
  {
    path: "/login",
    component: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    isPrivate: false,
  },
  //   {
  //     path: "/register",
  //     component: (
  //       <PublicRoute>
  //         <Register />
  //       </PublicRoute>
  //     ),
  //     isPrivate: false,
  //   },
  {
    path: "/buddy",
    component: (
      <PrivateRoute>
        <Buddy />
      </PrivateRoute>
    ),
    isPrivate: false,
  },
  {
    path: "/explorer",
    component: (
      <PrivateRoute>
        <Explorer />
      </PrivateRoute>
    ),
    isPrivate: false,
  },
  {
    path: "/events",
    component: (
      <PrivateRoute>
        <Events />
      </PrivateRoute>
    ),
    isPrivate: false,
  },
  {
    path: "/faq",
    component: (
      <PrivateRoute>
        <FAQ />
      </PrivateRoute>
    ),
    isPrivate: false,
  },
  {
    path: "/citydirectory",
    component: (
      <PrivateRoute>
        <CityDirectory />
      </PrivateRoute>
    ),
    isPrivate: false,
  },
  // {
  //   path: "/vendors",
  //   component: (
  //     <PrivateRoute>
  //       <Vendors />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/admins",
  //   component: (
  //     <PrivateRoute>
  //       <Admins />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/events",
  //   component: (
  //     <PrivateRoute>
  //       <Events />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/venues",
  //   component: (
  //     <PrivateRoute>
  //       <Venues />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/subscriptions",
  //   component: (
  //     <PrivateRoute>
  //       <Subscriptions />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/payments",
  //   component: (
  //     <PrivateRoute>
  //       <Payments />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/token-points",
  //   component: (
  //     <PrivateRoute>
  //       <TokenPoints />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/event-categories",
  //   component: (
  //     <PrivateRoute>
  //       <EventCategories />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/venue-features",
  //   component: (
  //     <PrivateRoute>
  //       <VenueFeatures />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/amenities",
  //   component: (
  //     <PrivateRoute>
  //       <Amenities />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/banners",
  //   component: (
  //     <PrivateRoute>
  //       <Banners />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/addons",
  //   component: (
  //     <PrivateRoute>
  //       <Addons />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/offline-addon",
  //   component: (
  //     <PrivateRoute>
  //       <OfflineAddon />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
  // {
  //   path: "/admin-actionables",
  //   component: (
  //     <PrivateRoute>
  //       <Actionables />
  //     </PrivateRoute>
  //   ),
  //   isPrivate: false,
  // },
];

export default routes;
