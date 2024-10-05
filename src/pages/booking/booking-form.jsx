import { ERROR_MSG } from '@/constants/error-msg';
import { TOAST_TYPE } from '@/constants/toast-constant';
import BookingServices from '@/services/BookingServices';
import PropertyServices from '@/services/PropertyServices';
import { showToast } from '@/utils/common-service';
import { bookingPage, dashboard } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Datepicker from 'react-tailwindcss-datepicker';
import { z } from 'zod';

function BookingForm() {
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState([]);
    const [data, setData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPayPal, setShowPayPal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [disabledDate, setDisabledDate] = useState([]);
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: null
    });
    const navigate = useNavigate();
    const location = useLocation();

    console.log("location", location);


    const calculateDateDifference = () => {
        if (value.startDate && value.endDate) {
            const start = new Date(value.startDate);
            const end = new Date(value.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return 0;
    };

    // Property data
    const getPropertyById = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await PropertyServices.getPropertyById(id, token)
            setPropertyData(res.data.data)
        } catch (err) {
            console.error("error by id", err);
        }
    }

    // booking data by property id
    const getBookingByPropertyId = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await BookingServices.getBookingByPropertyId(id, token)
            const data = res.data.data
            const disabledDates = data.map((property) => {
                return {
                    startDate: new Date(property.startDate),
                    endDate: new Date(property.endDate),
                };
            });
            setDisabledDate(disabledDates)
        } catch (err) {
            console.error("error by id", err);
        }
    }


    useEffect(() => {
        getPropertyById();
        getBookingByPropertyId();
    }, []);

    const schema = z.object({
        FullName: z.string().min(1, "Customer name is required"),
        NoOfGuests: z.coerce.number().min(1, "Number of guests is required"),
        MobileNo: z.coerce.number().min(1111111111, "Mobile number should be 10 digits").max(9999999999, "Mobile number should be 10 digits"),
        Guidence: z.string().optional(),
        Email: z.string().min(1, "Email is required").email("Invalid email address"),
        Price: z.number().optional()
    })

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data) => {
        setIsSubmitted(true);
        const diffDate = calculateDateDifference();
        const totalPrice = diffDate * propertyData?.price;
        if (data.Guidence) {
            data.Price = totalPrice + 2000;
        } else {
            data.Price = totalPrice;
        }
        setData(data);
        setShowPayPal(true);
    }

    const payment = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'));
        const pendingData = {
            UserId: user?.id,
            PropertyId: Number(id),
            StartDate: value.startDate,
            EndDate: value.endDate
        }
        const allData = {
            ...data, ...pendingData
        }

        const token = localStorage.getItem('token');
        try {
            const res = await BookingServices.addBooking(allData, token)
            if (res.data.status == HttpStatusCode.Ok) {
                setLoading(false)
                navigate(bookingPage)
            } else {
                showToast(TOAST_TYPE.FAILURE, ERROR_MSG.INTERNAL_SERVER_ERR)
            }
        } catch (err) {
            console.error("error: ", err);
        } finally {
            setLoading(false)
        }
    }

    const goToBack = () => {
        navigate(dashboard)
    }

    // const isDateDisabled = (currentDate) => {
    //     return disabledDate.some(({ start, end }) => {
    //         const currDate = new Date(currentDate);
    //         return currDate >= start && currDate <= end;
    //     });
    // };

    // useEffect(() => {
    //     if (showPayPal) {
    //         const script = document.createElement('script');
    //         script.src = `https://www.paypal.com/sdk/js?client-id=ARx9XhShyrot9_JI_fW8sagf31uV-tGwDGxfhC2XN25z_oB3TxElJB1XMwepjD-N99ScSnKbr29WgFzO&currency=USD`;
    //         script.async = true;
    //         script.onload = () => {
    //             if (window.paypal) {
    //                 window.paypal.Buttons({
    //                     createOrder: function (data, actions) {
    //                         // Ensure data.Price is a number
    //                         const price = Number(data.Price) || 0;
    //                         console.log('Creating order with price:', price);
    //                         return actions.order.create({
    //                             purchase_units: [{
    //                                 amount: {
    //                                     currency_code: "USD",
    //                                     value: 7000
    //                                 }
    //                             }]
    //                         });
    //                     },
    //                     onApprove: function (data, actions) {
    //                         return actions.order.capture().then(function (details) {
    //                             console.log('Transaction completed by ' + details.payer.name.given_name);
    //                         });
    //                     }
    //                 }).render('#paypal-button-container');
    //             }
    //         };
    //         document.body.appendChild(script);

    //         return () => {
    //             document.body.removeChild(script);
    //         };
    //     }
    // }, [showPayPal]);


    return (
        <div className='p-6'>
            <div className='mb-6 text-3xl'>
                Booking {propertyData?.propertyName}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            {propertyData?.propertyType} Name
                        </Typography>
                        <Input
                            size="lg"
                            value={propertyData?.propertyName}
                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            Price
                        </Typography>
                        <Input
                            size="lg"
                            value={propertyData?.price}
                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            Customer Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="John Doe"
                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register('FullName')}
                        />
                        {errors?.FullName && <span className='text-red-500'>{errors?.FullName?.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            Number of guests
                        </Typography>
                        <Input
                            type='number'
                            size="lg"
                            placeholder="8"
                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register('NoOfGuests')}
                        />
                        {errors?.NoOfGuests && <span className='text-red-500'>{errors?.NoOfGuests?.message}</span>}
                    </div>
                </div>

                {/* Mobile number */}
                <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            Mobile Number
                        </Typography>
                        <Input
                            type='number'
                            size="lg"
                            placeholder="9999999999"
                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register('MobileNo')}
                        />
                        {errors?.MobileNo && <span className='text-red-500'>{errors?.MobileNo?.message}</span>}
                    </div>

                    {/* star_date and end_date */}
                    <div className='flex flex-col  items-center mx-20 sm:mx-0 mt-6'>
                        <div className="flex flex-col sm:flex-row sm:gap-4 w-80 gap-6 border border-[#B0BEC5] h-12 items-center rounded-lg">
                            <Datepicker
                                popoverDirection="down"
                                useRange={false}
                                value={value}
                                minDate={new Date()}
                                onChange={newValue => setValue(newValue)}
                                disabledDates={disabledDate}
                            />
                        </div>
                        {isSubmitted && !value?.endDate && (
                            <span className='text-red-500 mt-2'>Date is required</span>
                        )}
                    </div>
                </div>

                {/* Third Row: Total Rooms and City */}
                <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="abc@gmail.com"
                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register('Email')}
                        />
                        {errors?.Email && <span className='text-red-500'>{errors?.Email?.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            Choose guidence
                        </Typography>
                        <Controller
                            name="Guidence"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    size="lg"
                                    label="Select Property Type"
                                    {...field}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                >
                                    <Option value="Mountain Guide">Mountain Guide</Option>
                                    <Option value="Ocean Explorer">Ocean Explorer</Option>
                                    <Option value="Forest Trekker">Forest Trekker</Option>
                                    <Option value="Desert Specialist">Desert Specialist</Option>
                                </Select>
                            )}
                        />
                    </div>
                </div>

                {isSubmitted && Object.keys(errors).length === 0 && (
                    <div className="p-6 py-12 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Billing Details</h2>

                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">Name:</span>
                            <span className="text-gray-900">{data.FullName}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">{propertyData?.propertyType} Name:</span>
                            <span className="text-gray-900">{propertyData.propertyName}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="text-gray-900">{data.Email}</span>
                        </div>

                        {data.Guidence &&
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Guidence Amount:</span>
                                <span className="text-gray-900">2000</span>
                            </div>
                        }

                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">Total Amount:</span>
                            <span className="text-gray-900">&#8377;{data.Price}</span>
                        </div>

                        <button onClick={payment} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            {loading ? <BeatLoader color='white' /> : "Confirm Payment"}
                        </button>
                        {/* {showPayPal && <div id="paypal-button-container"></div>} */}
                    </div>
                )}

                <div className='flex justify-end gap-16 items-end mr-12 ' >
                    <Button onClick={goToBack} className='bg-red-400 hover:bg-red-500' >Cancel</Button>
                    <Button type="submit" className='bg-green-400 hover:bg-green-500' >Submit</Button>
                </div>
            </form>



        </div>
    )
}

export default BookingForm