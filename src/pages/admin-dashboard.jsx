import { Routes, Route } from "react-router-dom";
import {
    Sidenav,
    DashboardNavbar,
    SimpleFooter,
} from "@/widgets/layout";
import { useMaterialTailwindController } from "@/context";
import { BuildingStorefrontIcon, HomeIcon, InformationCircleIcon, TableCellsIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Profile } from "@/pages";
import Home from "@/pages/dashboard/Home"
import Booking from "./booking";
import PropertyForm from "./property-form";
import React from "@heroicons/react";
import { Fragment } from "react";
import PropertyView from "./property-view";
import PropertyEditForm from "./property-edit-form";

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
                    icon: <BuildingStorefrontIcon {...icon} />,
                    name: "property",
                    path: "/property",
                    element: <Booking />,
                    // anotherPage: {
                    //     name: "property-form",
                    //     path: "/property-form",
                    //     element: <PropertyForm />
                    // }
                },
                {
                    icon: <InformationCircleIcon {...icon} />,
                    name: "notifications",
                    path: "/notifications",
                    element: <Profile />,
                }
            ],
        }
    ];

    const adminDashboardData = [
        {
            layout: "admin-dashboard",
            pages: [
                {
                    name: "dashboard",
                    path: "/home",
                    element: <Home />
                },
                {
                    name: "profile",
                    path: "/profile",
                    element: <Profile />
                },
                {
                    name: "tables",
                    path: "/tables",
                    element: <Profile />
                },
                {
                    name: "property",
                    path: "/property",
                    element: <Booking />
                },
                {
                    name: "notifications",
                    path: "/notifications",
                    element: <Profile />
                },
                {
                    name: "property-form",
                    path: "/property-form",
                    element: <PropertyForm />
                },
                {
                    name: "property-view",
                    path: "/property-view/:id",
                    element: <PropertyView />
                },
                {
                    name: "property-edit-form",
                    path: "/property-edit/:id",
                    element: <PropertyEditForm />
                }
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
                    {adminDashboardData.map(({ layout, pages }) =>
                        layout === "admin-dashboard" &&
                        pages.map(({ path, element }, index) => (
                            <Fragment key={`${index}`}>
                                <Route exact path={path} element={element} />
                            </Fragment>
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
