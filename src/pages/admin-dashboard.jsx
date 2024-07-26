import { Routes, Route } from "react-router-dom";
import {
    Sidenav,
    DashboardNavbar,
    SimpleFooter,
} from "@/widgets/layout";
import { useMaterialTailwindController } from "@/context";
import { HomeIcon, InformationCircleIcon, TableCellsIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Profile } from "@/pages";
import Home from "@/pages/dashboard/Home"

export function AdminDashboard() {

    const icon = {
        className: "w-5 h-5 text-inherit",
    };
    const routes = [
        {
            layout: "admin-dashboard",
            pages: [
                {
                    icon: <HomeIcon {...icon} />,
                    name: "dashboard",
                    path: "/home",
                    element: <Home />,
                },
                {
                    icon: <UserCircleIcon {...icon} />,
                    name: "profile",
                    path: "/profile",
                    element: <Profile />,
                },
                {
                    icon: <TableCellsIcon {...icon} />,
                    name: "tables",
                    path: "/tables",
                    element: <Profile />,
                },
                {
                    icon: <InformationCircleIcon {...icon} />,
                    name: "notifications",
                    path: "/notifications",
                    element: <Profile />,
                },
            ],
        }
    ];
    const [controller] = useMaterialTailwindController();
    const { sidenavType } = controller;

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={routes}
                brandImg={
                    sidenavType === "dark" ? "/img/logo.png" : "/img/logo.png"
                }
            />
            <div className="p-4 xl:ml-80">
                <DashboardNavbar />
                <Routes>
                    {routes.map(
                        ({ layout, pages }) =>
                            layout === "admin-dashboard" &&
                            pages.map(({ path, element }) => (
                                <Route exact path={path} element={element} />
                            ))
                    )}
                </Routes>
                <div className="text-blue-gray-600">
                    <SimpleFooter />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
