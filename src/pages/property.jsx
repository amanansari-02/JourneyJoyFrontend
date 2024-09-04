import PropertyServices from '@/services/PropertyServices';
import { property } from '@/utils/route';
import DashboardHeader from '@/widgets/layout/dashboardHeader'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Property() {
    const location = useLocation();
    const navigate = useNavigate()
    const locationValue = location?.state?.location || ''
    const priceRangeValue = location?.state?.priceRange || ''
    const apiUrl = import.meta.env.VITE_API_URL
    const data = useMemo(() => ({ location: locationValue, price: priceRangeValue }), [locationValue, priceRangeValue]);

    const [propertyData, setPropertyData] = useState([]);

    const SendSingleProperty = (id) => {
        const singleprop = `${property}/${id}`
        navigate(singleprop)
    }

    // api by search
    const SearchPropertyApi = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await PropertyServices.getPropertyDataBySearch(data, token)
            const status = res.data.status
            if (status == HttpStatusCode.Ok) {
                setPropertyData(res.data.data)
            } else if (status == HttpStatusCode.BadRequest) {
                setPropertyData([])
            }
        } catch (err) {
            console.error("error", err);
        }
    }

    useEffect(() => {
        SearchPropertyApi()
    }, [data])

    function ProductListCard({
        id,
        img,
        name,
        price,
        guests,
        bedroom,
        type
    }) {
        return (
            <Card className="border border-gray-300 mb-2 mx-4 sm:mx-0 hover:shadow-2xl transition-shadow duration-300">
                <CardBody className="m-0 p-0">
                    <img src={img} alt={img} className="min-w-[280px] max-h-[280px] w-full shadow-lg shadow-gray-500/10 rounded-t-xl" />
                    <div className="p-5">
                        <Typography className="mb-2 text-gray-400 font-medium tracking-wide" >
                            {type}
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
                            <Button variant="filled" onClick={() => SendSingleProperty(id)}>Details</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <div>
            <DashboardHeader locationVal={locationValue} priceVal={priceRangeValue} />

            {/*  */}
            <section>
                <div className="mx-auto container">
                    {propertyData.length > 0 ?
                        (<div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                            {propertyData.map(({ id, propertyImages, propertyName, price, noOfGuests, rooms, propertyType }, index) => (
                                <ProductListCard
                                    id={id}
                                    key={index}
                                    img={`${apiUrl}/${propertyImages[0]}`}
                                    name={propertyName}
                                    price={price}
                                    guests={noOfGuests}
                                    bedroom={rooms}
                                    type={propertyType}
                                />
                            ))}
                        </div>) :
                        <div className='text-center text-xl mt-12 mb-20'>No Property Found</div>
                    }
                </div>
            </section>
        </div>
    )
}

export default Property