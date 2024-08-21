import { Avatar, Button, Card, CardBody, CardHeader, Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React from 'react'
import { authorsTableData } from "@/data";
import { EllipsisVerticalIcon, EyeIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { ArchiveBoxIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { bookingForm } from '@/utils/route';

function Booking() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='h-16 w-full flex justify-between mb-8'>
                <p className='text-xl font-semibold flex items-center'>Property Details</p>
                <Link to="/admin-dashboard/booking-form">
                    <Button variant="filled" className='mx-2 my-2' >Add Property</Button>
                </Link>
            </div>
            <div>
                <Card>
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Property Table
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["author", "function", "status", "employed", ""].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {authorsTableData.map(
                                    ({ img, name, email, job, online, date }, key) => {
                                        const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;

                                        return (
                                            <tr key={name}>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <Avatar src={img} alt={name} size="sm" variant="rounded" />
                                                        <div>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-semibold"
                                                            >
                                                                {name}
                                                            </Typography>
                                                            <Typography className="text-xs font-normal text-blue-gray-500">
                                                                {email}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {job[0]}
                                                    </Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {job[1]}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={online ? "green" : "blue-gray"}
                                                        value={online ? "online" : "offline"}
                                                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                    />
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {date}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    {/* <Typography
                                                        as="a"
                                                        href="#"
                                                        className="text-xs font-semibold text-blue-gray-600"
                                                    > */}
                                                    <Menu>
                                                        <MenuHandler>
                                                            <IconButton
                                                                variant="text"
                                                                color="blue-gray"
                                                                className='w-8 h-8'
                                                            >
                                                                <EllipsisVerticalIcon className="h-6 w-6 text-blue-gray-500" />
                                                            </IconButton>
                                                        </MenuHandler>
                                                        <MenuList className='w-[10%]'>
                                                            <MenuItem className="flex items-center gap-2">
                                                                <p><EyeIcon className='h-5 w-5' /></p>
                                                                <p>View</p>
                                                            </MenuItem>
                                                            <MenuItem className="flex items-center gap-2">
                                                                <p><PencilSquareIcon className='h-5 w-5' /></p>
                                                                <p>Edit</p>
                                                            </MenuItem>
                                                            <MenuItem className="flex items-center gap-2">
                                                                <p><TrashIcon className='h-5 w-5' /></p>
                                                                <p>Delete</p>
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Booking