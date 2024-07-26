import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { SignUp } from "./pages";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Property from "./pages/property";
import { adminDashboard, dashboard, home, imagesVideos, profile, property, signIn, signUp } from "./utils/route";
import SingleProperty from "./pages/single-property";
import ImagesVideos from "./pages/images-videos";
import ProtectedRoute from "./widgets/layout/protected-routes";
import AdminDashboard from "./pages/admin-dashboard";
import Sidenav from "./widgets/layout/sidenav";


function App() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname == `/${signIn}` || pathname == `/${home}` && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}

      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path={`/${signUp}`} element={<SignUp />} />
        <Route path={`/${dashboard}`} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path={`/${profile}`} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path={`/${property}`} element={<ProtectedRoute><Property /></ProtectedRoute>} />
        <Route path={`/${property}/:id`} element={<ProtectedRoute><SingleProperty /></ProtectedRoute>} />
        <Route path={`/${imagesVideos}/:id`} element={<ProtectedRoute><ImagesVideos /></ProtectedRoute>} />
        <Route path={`/${adminDashboard}`} element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path={`/admin-dashboard/*`} element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to={`/${home}`} replace />} />
      </Routes>
    </>
  );
}

export default App;
