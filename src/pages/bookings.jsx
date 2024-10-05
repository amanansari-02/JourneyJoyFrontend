import BookingServices from '@/services/BookingServices';
import { Card, CardBody, CardHeader, Chip, Typography } from '@material-tailwind/react';
import { HttpStatusCode } from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

function Bookings() {
    const [booking, setBooking] = useState([]);
    const itemsPerPage = 10;

    // getBookingByUserId
    const getBookingByUserId = async () => {
        try {
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))
            const res = await BookingServices.getAllBooking(token)
            if (res.data.status === HttpStatusCode.Ok) {
                console.log("data", res.data);
                setBooking(res.data.data)
            } else if (res.data.status == HttpStatusCode.NotFound) {

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
        <div>
            <div className='mt-16 '>
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

export default Bookings