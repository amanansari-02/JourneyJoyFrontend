import { Footer } from "@/widgets/layout";
import React from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import DashboardHeader from "@/widgets/layout/dashboardHeader";


function HotelCard({ img, name, title, price }) {
    return (
        <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
            <CardBody className="text-center flex justify-start">
                <div>
                    <Avatar
                        src={img}
                        alt={name}
                        variant="rounded"
                        size="xxl"
                        className="mx-auto object-top"
                    />
                </div>
                <div>
                    <Typography variant="h5" color="blue-gray" className="!font-medium text-lg ml-4">
                        {name}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="mb-2 !text-base !font-semibold text-gray-600 ml-2"
                    >
                        {title}
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
                        >
                            Details
                        </button>
                    </div>

                </div>
            </CardBody>
        </Card>
    );
}


const members = [
    {
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrWxN3voOMIxw3vjj7buYSzyIvqFf05jrCg&s`,
        name: "Diamond Hotel",
        title: "Lonavla",
        price: 8000
    },
    {
        img: `https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg`,
        name: "Crystall Villa",
        title: "Bombay",
        price: 5000
    },
    {
        img: `https://cf.bstatic.com/static/img/theme-index/bg_villas_new/b765353732f8ec1ccac1e0d62786c37dc1c80ae7.jpg`,
        name: "Ripple Hotel",
        title: "Pune",
        price: 12000
    },
    {
        img: `https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?s=612x612&w=0&k=20&c=Ek2P0DQ9nHQero4m9mdDyCVMVq3TLnXigxNPcZbgX2E=`,
        name: "Sand Villa",
        title: "Mahableshwar",
        price: 19000
    },
    {
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGpC6N4fsMlT85a8QBOc1aqztKs0CL3ugRKg&s`,
        name: "Pine Hotel",
        title: "Goa",
        price: 14000
    },
    {
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49WuECr-ZZNOGJSYRCXnZYCbUAYjXRTqNNg&s`,
        name: "Mona Lisa Villa",
        title: "Lonavla",
        price: 16000
    }
];

function Dashboard() {
    return (
        <div>

            <DashboardHeader />

            {/* Top Places */}
            <div>
                <Typography variant="h3" className="flex justify-center text-blue-gray-600 mb-3">
                    Top 6 adventure place
                </Typography>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-4 mb-2">
                    {members.map((props, key) => (
                        <HotelCard key={key} {...props} />
                    ))}
                </div>
            </div>

            {/* Best Of 2024 */}
            <Typography variant="lead" className="flex flex-col lg:flex-row justify-between items-center">
                <Typography variant="lead" className="px-4 py-6 lg:m-12 w-full lg:w-[60%] text-center lg:text-left">
                    <Typography variant="paragraph" className="text-blue-gray-400 text-3xl font-normal">
                        Best Of
                    </Typography>
                    <Typography variant="paragraph" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-5">
                        2024
                    </Typography>
                    <Typography variant="paragraph" className="mt-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores deleniti placeat voluptatem fugiat eaque sequi quibusdam distinctio adipisci commodi. Minima quo officiis quasi aut, repudiandae iusto deserunt quibusdam aliquid consectetur, nemo voluptates. Quia incidunt sapiente fugit quae temporibus
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
                    Embark on a thrilling expedition through breathtaking landscapes, where every step uncovers new wonders and every horizon promises adventure. Join us as we traverse the unknown, forging memories that will last a lifetime.
                </Typography>
                <Typography
                    variant="h1"
                    className="text-5xl md:text-9xl text-transparent bg-clip-text bg-cover bg-center font-extrabold"
                    style={{
                        backgroundImage: `url('https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600?auto=compress&cs=tinysrgb&w=1200')`,
                        backgroundSize: 'cover',
                        WebkitTextFillColor: 'transparent',
                        backgroundAttachment: 'fixed', // Fixed background
                        textAlign: 'center',
                    }}
                >
                    ADVENTURE
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
                        Ready to Explore?
                    </Typography>
                    <Typography variant="h1" className="text-4xl text-white sm:text-6xl">
                        Book Your Adventure Now!
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
                        Ready to embark on your next
                    </Typography>
                    <Typography variant="paragraph" className="text-2xl text-gray-700 sm:text-4xl">
                        adventure? Connect with JourneyJoy today
                    </Typography>
                    <Typography variant="paragraph" className="text-2xl text-gray-700 sm:text-4xl">
                        to start planning you dream trip.
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