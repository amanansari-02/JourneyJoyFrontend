import BookingServices from '@/services/BookingServices';
import PropertyServices from '@/services/PropertyServices';
import { Breadcrumbs, Card, CardBody, CardHeader, Chip, Typography } from '@material-tailwind/react';
import { HttpStatusCode } from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function BookingPage() {

    const [booking, setBooking] = useState([]);
    const itemsPerPage = 10;

    // getBookingByUserId
    const getBookingByUserId = async () => {
        try {
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))
            const res = await BookingServices.getBookingByUserId(user?.id, token)
            if (res.data.status === HttpStatusCode.Ok) {
                setBooking(res.data.data)
            }
        } catch (err) {
            console.error("error by id", err);
        }
    }

    useEffect(() => {
        getBookingByUserId();
    }, []);


    const pageCount = Math.ceil(booking.length / itemsPerPage);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };



    return (
        <div className='p-6'>
            <div>
                <Breadcrumbs className='m-4'>
                    <Link to="/dashboard" className="opacity-60" >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1 -mt-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v-2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>
                    <a className="opacity-60">
                        <span>Booking Table</span>
                    </a>
                </Breadcrumbs>
                {/* <div className='mt-4 '>
                    Booking Data
                </div> */}
            </div>
            <div className='mt-10 p-6'>
                <Card>
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">Booking Table</Typography>
                    </CardHeader>
                    {booking.length > 0 ?
                        (<CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {["name", "villa name", "start date", "end date", "status"].map((el) => (
                                            <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                    {el}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking.map(({ id, fullName, property, startDate, endDate }, key) => {
                                        const className = `py-3 px-5 ${key === booking.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                                        return (
                                            <tr key={id}>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {fullName}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {property?.propertyName}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {format(new Date(startDate), "d/M/yyyy")}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {format(new Date(endDate), "d/M/yyyy")}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={id ? "green" : "blue-gray"}
                                                        value={id ? "approved" : "pending"}
                                                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="flex justify-end p-4">
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </CardBody>)
                        :
                        <CardBody className="text-center overflow-x-scroll px-0 pt-0 pb-4">
                            No Booking found
                        </CardBody>
                    }
                </Card>
            </div>
        </div>
    )
}

export default BookingPage