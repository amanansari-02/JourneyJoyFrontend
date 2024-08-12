import React from 'react';
import { Breadcrumbs, Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { imagesVideos } from '@/utils/route';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCoffee, faUser, faSwimmingPool, faGamepad, faTv, faSpa, faUtensils } from '@fortawesome/free-solid-svg-icons';


function SingleProperty() {
    const navigate = useNavigate();
    const images = [
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2bcicB37u7i0Vovi_r6NDawH3BlfOGJ2H_Q&s',
            alt: 'image 1',
        },
        {
            src: 'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
            alt: 'image 2',
        },
        {
            src: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
            alt: 'image 3',
        },
        {
            src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
            alt: 'image 4',
        },
    ];

    const slideHeight = '250px';

    function viewImages() {
        const imagesVideo = `/${imagesVideos}/1`
        navigate(imagesVideo)
    }

    const items = [
        { icon: faWifi, text: 'Free Wifi' },
        { icon: faCoffee, text: 'Complimentary Coffee' },
        { icon: faUser, text: '24/7 Concierge' },
        { icon: faSwimmingPool, text: 'Personal Swimming Pool' },
        { icon: faGamepad, text: '5 different types games' },
        { icon: faTv, text: 'Flat Screen TV' },
        { icon: faUtensils, text: 'In-House Restaurant' }
    ];

    function HotelDetails() {
        return (
            <div>
                <Typography variant='lead' className='flex flex-col sm:flex-row sm:justify-between'>
                    <Card className="mt-6 sm:w-[60%] w-full">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Beach Front Villa
                            </Typography>
                            <Typography variant='h3' className='text-orange-500 mb-4'>
                                13000/per-day
                            </Typography>
                            <Typography variant='paragraph' className='font-bold mb-2'>
                                <span className='text-black'>Rooms:</span>  4
                            </Typography>
                            <Typography variant='paragraph' className='font-bold mb-2'>
                                <span className='text-black'>Address:</span>  6, Nr Jalram Temple, Tribhuvan Terrace, Station Rd, Kandivli(w)
                            </Typography>
                            <Typography variant='paragraph' className='font-bold text-black'>Description: </Typography>
                            <Typography variant='paragraph' className='font-bold'>
                                Boasting accommodation with a private pool, garden view and a balcony, The Perfect Stays Mountain Paradise Villa is situated in Lonavala. Featuring a 24-hour front desk, this property also provides guests with an outdoor fireplace. The villa also features free WiFi, free private parking and facilities for disabled guests.
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card className='mt-6 sm:w-[35%] w-full'>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Amenities
                            </Typography>
                            <div className="border-t-2 border-dashed border-gray-400 my-6" />
                            <div>
                                {items.map((item, index) => (
                                    <Typography key={index} variant='paragraph' className='px-4 flex items-center gap-1 mt-2'>
                                        <FontAwesomeIcon icon={item.icon} color='orange' size='xl' />
                                        <Typography variant='paragraph' className='text-lg font-medium ml-4'>
                                            {item.text}
                                        </Typography>
                                    </Typography>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </Typography>
                <div className='flex justify-between mx-4 my-2'>
                    <Typography variant='paragraph' className='font-bold text-gray-700'>
                        ₹13000
                        <span className='flex'>1 day price</span>
                    </Typography>
                    <Button size='lg' className='bg-teal-400'>
                        Book Now
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumbs className='m-4'>
                <a href="/property" className="opacity-60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mr-1 -mt-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v-2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>
                <a className="opacity-60">
                    <span>Beach Front Villa</span>
                </a>
            </Breadcrumbs>
            <div className="bg-gray-400 h-0.5 w-full mx-auto mb-4"></div>
            <div className="panel lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Gallery</h5>
                    <button
                        onClick={viewImages}
                        className="border border-dashed p-2 font-bold bg-white text-black text-sm"
                    >
                        View Images & Videos
                    </button>
                </div>
                <div className="relative">
                    <Swiper
                        loop={true}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            nextEl: '.swiper-button-next-ex5',
                            prevEl: '.swiper-button-prev-ex5',
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            1024: {
                                slidesPerView: images.length < 2 ? 1 : images.length < 3 ? 2 : 3,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {!images.length ? (
                            <div>No Data Available</div>
                        ) : (
                            images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img.src}
                                        className="w-full h-[50%] object-cover rounded-sm"
                                        style={{ height: slideHeight }}
                                        alt={img.alt}
                                    />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                    <div className='hidden sm:block'>
                        <div className="absolute inset-0 flex justify-between items-center">
                            <button className="swiper-button-prev-ex5 grid place-content-center left-2 p-1 transition text-white bg-blue-400 hover:text-white border border-blue-600 hover:border-blue-600 hover:bg-blue-600 rounded-full z-[999]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path d="M15 5L9 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="swiper-button-next-ex5 grid place-content-center right-2 p-1 transition text-white bg-blue-400 hover:text-white border border-blue-600 hover:bg-blue-600 rounded-full z-[999]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <HotelDetails />
            </div>
        </div>
    );
}

export default SingleProperty;
