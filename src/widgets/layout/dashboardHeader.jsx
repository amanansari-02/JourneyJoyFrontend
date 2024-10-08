import React, { useState } from 'react';
import { Navbar } from '.';
import { Button, Card, CardBody, Input, Option, Select, Typography, Dialog, DialogHeader, DialogFooter, DialogBody }
    from '@material-tailwind/react';
import { Home } from '@/pages';
import { booking, bookingPage, dashboard, profile, property, signIn } from '@/utils/route';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_TEXT_CONTENT } from '@/utils/text-content';
import { removeItemToLocalStorage } from '@/utils/common-service';

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
    return (
        <Dialog size="sm" open={isOpen} toggler={onClose}>
            <DialogHeader toggler={onClose}>Confirm Logout</DialogHeader>
            <DialogBody>
                <p>Are you sure you want to log out?</p>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={onConfirm}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

function DashboardHeader({ locationVal, priceVal }) {
    const [location, setLocation] = useState(locationVal);
    const [priceRange, setPriceRange] = useState(priceVal);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeItemToLocalStorage("user")
        navigate(signIn)
    }

    const openLogoutPopup = () => {
        setLogoutPopup(true);
    };
    const closeLogoutPopup = () => setLogoutPopup(false);

    const routes = [
        {
            name: "dashboard",
            value: `${dashboard}`,
            path: `${dashboard}`,
            element: <Home />
        },
        {
            name: "Booking",
            value: `${booking}`,
            path: `${bookingPage}`
        },
        {
            name: "Profile",
            value: `${profile}`,
            path: `${profile}`
        },
        {
            name: "Log Out",
            onClick: openLogoutPopup
        }
    ];

    const navigateToSearchHotels = () => {
        const searchDataPage = `${property}`;
        navigate(searchDataPage, { state: { location, priceRange } });
    };

    return (
        <div>
            <div className="absolute top-0 h-[75%] w-full bg-[url('/img/background-2.jpg')] bg-cover bg-center" />
            <div className="absolute top-0 h-[75%] w-full bg-black/60 bg-cover bg-center" />
            <div className="max-w-8xl container relative mx-auto m-4">
                <Navbar routes={routes} />
                <div className="flex flex-wrap items-center">
                    <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-6 font-black"
                        >
                            {DASHBOARD_TEXT_CONTENT.TEXT_1}
                        </Typography>
                        <Typography variant="lead" color="white" className="opacity-80">
                            {DASHBOARD_TEXT_CONTENT.TEXT_2}
                        </Typography>
                    </div>
                </div>
            </div>
            {/* Search Bar */}
            <div>
                <section className="bg-white px-4 pb-10 pt-8">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                            <Card className="shadow-lg shadow-gray-500/10">
                                <CardBody className="px-4">
                                    <Typography variant="h5" className="mb-2" color="blue-gray">
                                        {DASHBOARD_TEXT_CONTENT.TEXT_3}
                                    </Typography>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="mb-2 w-full md:w-[40%]">
                                            <Typography variant="paragraph" className="mb-1 font-semibold">
                                                {DASHBOARD_TEXT_CONTENT.INPUT_1}
                                            </Typography>
                                            <Input
                                                label="Enter Location"
                                                icon={<i className="fa fa-location-arrow" />}
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2 w-full md:w-[40%]">
                                            <Typography variant="paragraph" className="mb-1 font-semibold">
                                                {DASHBOARD_TEXT_CONTENT.INPUT_2}
                                            </Typography>
                                            <Select
                                                label="Price Range"
                                                value={priceRange}
                                                onChange={(e) => setPriceRange(e)}
                                            >
                                                <Option value="2000-5000">2000-5000</Option>
                                                <Option value="5000-10000">5000-10000</Option>
                                                <Option value="10000-15000">10000-15000</Option>
                                                <Option value="15000-20000">15000-20000</Option>
                                                <Option value="200000-30000">200000-30000</Option>
                                            </Select>
                                        </div>
                                        <div className="mb-2 w-full md:w-[10%] flex items-center justify-center">
                                            <Button
                                                color="blue"
                                                className="py-3 px-4 mt-6 w-full md:w-auto"
                                                onClick={navigateToSearchHotels}
                                            >
                                                {DASHBOARD_TEXT_CONTENT.BUTTON_1}
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
            <ConfirmationPopup
                isOpen={logoutPopup}
                onClose={closeLogoutPopup}
                onConfirm={() => {
                    handleLogout();
                    closeLogoutPopup();
                }}
            />
        </div>
    );
}

export default DashboardHeader;
