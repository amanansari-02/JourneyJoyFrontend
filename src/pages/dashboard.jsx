import { Footer } from "@/widgets/layout";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import DashboardHeader from "@/widgets/layout/dashboardHeader";
import { USER_DASHBOARD } from "@/utils/text-content";
import PropertyServices from "@/services/PropertyServices";

const apiUrl = import.meta.env.VITE_API_URL


function HotelCard({ id, propertyImages, propertyName, city, price }) {
    return (
        <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
            <CardBody className="text-center flex justify-start">
                <div>
                    <Avatar
                        src={`${apiUrl}/${propertyImages[0]}`}
                        alt={propertyName}
                        variant="rounded"
                        size="xxl"
                        className="mx-auto object-top"
                    />
                </div>
                <div>
                    <Typography variant="h5" color="blue-gray" className="!font-medium text-lg ml-4">
                        {propertyName}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="mb-2 !text-base !font-semibold text-gray-600 ml-2"
                    >
                        {city}
                    </Typography>
                    <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                            <Typography
                                variant="lead"
                                color="blue-gray"
                                className="text-black"
                            >
                                <span className="text-lg font-bold  ml-4"
                                >{price}/</span>
                                <span
                                    className="text-sm mt-1 font-semibold "
                                >
                                    per-day
                                </span>
                            </Typography>
                        </div>
                        <div className="flex-grow"></div>
                        <button
                            className="px-3 py-1 bg-blue-400 text-white rounded-md ml-4"
                            // onClick={navigateTo}
                        >
                            Details
                        </button>
                    </div>

                </div>
            </CardBody>
        </Card>
    );
}


function Dashboard() {
    const [propertyData, setPropertyData] = useState([]);

    // latest property
    const getLatestProperty = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await PropertyServices.getLatestProperty(token)
            setPropertyData(res.data.data)

        } catch (err) {
            console.error("error by id", err);
        }
    }

    useEffect(() => {
        getLatestProperty();
    }, []);

    return (
        <div>

            <DashboardHeader />

            {/* Top Places */}
            <div>
                <Typography variant="h3" className="flex justify-center text-blue-gray-600 mb-3">
                    {USER_DASHBOARD.TEXT_1}
                </Typography>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-4 mb-2">
                    {propertyData.map((props, key) => (
                        <HotelCard key={key} {...props} />
                    ))}
                </div>
            </div>

            {/* Best Of 2024 */}
            <Typography variant="lead" className="flex flex-col lg:flex-row justify-between items-center">
                <Typography variant="lead" className="px-4 py-6 lg:m-12 w-full lg:w-[60%] text-center lg:text-left">
                    <Typography variant="paragraph" className="text-blue-gray-400 text-3xl font-normal">
                        {USER_DASHBOARD.SECTION_1.TEXT_1}
                    </Typography>
                    <Typography variant="paragraph" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-5">
                        {USER_DASHBOARD.SECTION_1.TEXT_2}
                    </Typography>
                    <Typography variant="paragraph" className="mt-5">
                        {USER_DASHBOARD.SECTION_1.TEXT_3}
                    </Typography>
                </Typography>
                <Typography variant="lead" className="w-full lg:w-[40%]">
                    <Typography variant="lead" className="mx-4 my-5">
                        <img className="rounded-3xl w-full" src="https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?s=612x612&w=0&k=20&c=Ek2P0DQ9nHQero4m9mdDyCVMVq3TLnXigxNPcZbgX2E=" />
                    </Typography>
                </Typography>
            </Typography>

            {/* Some Text Section */}
            <div className="relative mt-4 flex flex-col items-center">
                <Typography variant="paragraph" className="flex justify-center w-full md:w-[50%] text-center mb-4 px-4 md:px-0">
                    {USER_DASHBOARD.SECTION_2.TEXT_1}
                </Typography>
                <Typography
                    variant="h1"
                    className="text-5xl md:text-9xl text-transparent bg-clip-text bg-cover bg-center font-extrabold"
                    style={{
                        backgroundImage: `url('https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600?auto=compress&cs=tinysrgb&w=1200')`,
                        backgroundSize: 'cover',
                        WebkitTextFillColor: 'transparent',
                        backgroundAttachment: 'fixed',
                        textAlign: 'center',
                    }}
                >
                    {USER_DASHBOARD.SECTION_2.TEXT_2}
                </Typography>
            </div>

            {/* Style 1 Section */}
            <Card
                className="bg-cover bg-center h-96 m-4 relative"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/1683724/pexels-photo-1683724.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

                <div className="flex flex-col justify-center items-center h-full text-center relative">
                    <Typography variant="h1" className="text-4xl text-white mb-4 sm:text-6xl">
                        {USER_DASHBOARD.SECTION_3.TEXT_1}
                    </Typography>
                    <Typography variant="h1" className="text-4xl text-white sm:text-6xl">
                        {USER_DASHBOARD.SECTION_3.TEXT_2}
                    </Typography>
                </div>
            </Card>

            {/* Style 2 Section */}
            <Card
                className="bg-cover bg-center h-96 mb-0 rounded-none"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/1061623/pexels-photo-1061623.jpeg?auto=compress&cs=tinysrgb&w=600')`,
                }}
            >
                <div className="flex flex-col justify-center items-center h-full text-center ">
                    <Typography variant="paragraph" className="text-2lg text-black mb-4 sm:text-4xl ">
                        {USER_DASHBOARD.SECTION_4.TEXT_1}
                    </Typography>
                    <Typography variant="paragraph" className="text-2xl text-gray-700 sm:text-4xl">
                        {USER_DASHBOARD.SECTION_4.TEXT_2}
                    </Typography>
                    <Typography variant="paragraph" className="text-2xl text-gray-700 sm:text-4xl">
                        {USER_DASHBOARD.SECTION_4.TEXT_3}
                    </Typography>
                </div>
            </Card>

            <div className="bg-black mt-0">
                <Footer />
            </div>
        </div >
    );
}

export default Dashboard;