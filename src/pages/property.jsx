import { property } from '@/utils/route';
import DashboardHeader from '@/widgets/layout/dashboardHeader'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function Property() {
    const location = useLocation();
    const navigate = useNavigate()
    const locationValue = location?.state?.location || ''
    const priceRangeValue = location?.state?.priceRange || ''

    const SendSingleProperty = () => {
        const singleprop = `/${property}/1`
        navigate(singleprop)
    }

    function ProductListCard({
        img,
        name,
        price,
        guests,
        bedroom
    }) {
        return (
            <Card className="border border-gray-300 mb-2 mx-4 sm:mx-0 hover:shadow-2xl transition-shadow duration-300">
                <CardBody className="m-0 p-0">
                    <img src={img} alt={img} className="min-w-[280px] max-h-[60%] w-full shadow-lg shadow-gray-500/10 rounded-t-xl" />
                    <div className="p-5">
                        <Typography className="mb-2 text-gray-400 font-medium" >
                            VILLA
                        </Typography>
                        <div>
                            <Typography className="mb-2" color="blue-gray" variant="h6">
                                {name}
                            </Typography>
                            <Typography className=" text-gray-600 font-medium" color="blue-gray" variant="paragraph">
                                {guests} guests - {bedroom} bedrooms
                            </Typography>
                        </div>
                        <div className='flex justify-between'>
                            <Typography
                                variant="paragraph"
                            >
                                <span className='text-sm font-medium'>From</span>
                                <span className='text-black font-semibold text-lg'> {price}</span>
                            </Typography>
                            <Button variant="filled" onClick={SendSingleProperty}>Details</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }

    const CONTENTS = [
        {
            img: "https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg",
            name: "Five Palm Jumeirah Beachfront Villa - Pool, Jacuzzi",
            price: "2,500",
            guests: 8,
            bedroom: 3
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49WuECr-ZZNOGJSYRCXnZYCbUAYjXRTqNNg&s",
            name: "Two Bedroom Arabian Summerhouse Family Suite",
            price: "2,300",
            guests: 10,
            bedroom: 4
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtHw9dVLd1CmN6Q7g4aoBQfzZTJweeZ6U2mA&s",
            name: "Beach Front Villa in Five Palm Jumeirah Hotell",
            price: "1,240",
            guests: 4,
            bedroom: 2
        },

    ];

    return (
        <div>
            <DashboardHeader locationVal={locationValue} priceVal={priceRangeValue} />

            {/*  */}
            <section>
                <div className="mx-auto container">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                        {CONTENTS.map(({ img, name, price, guests, bedroom }, index) => (
                            <ProductListCard
                                key={index}
                                img={img}
                                name={name}
                                price={price}
                                guests={guests}
                                bedroom={bedroom}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Property