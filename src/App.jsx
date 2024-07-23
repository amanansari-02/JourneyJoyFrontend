import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { SignUp } from "./pages";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Property from "./pages/property";
import { dashboard, home, imagesVideos, profile, property, signIn, signUp } from "./utils/route";
import SingleProperty from "./pages/single-property";
import ImagesVideos from "./pages/images-videos";
import ProtectedRoute from "./widgets/layout/protected-routes";


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
        <Route path={`/${profile}`} element={<Profile />} />
        <Route path={`/${property}`} element={<Property />} />
        <Route path={`/${property}/:id`} element={<SingleProperty />} />
        <Route path={`/${imagesVideos}/:id`} element={<ImagesVideos />} />
        <Route path="*" element={<Navigate to={`/${home}`} replace />} />
      </Routes>
    </>
  );
}

export default App;
