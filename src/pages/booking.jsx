import { Avatar, Button, Card, CardBody, CardHeader, Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import eyeIcon from '../../public/img/eye-icon.gif';
import editIcon from '../../public/img/edit-icon.gif';
import deleteIcon from '../../public/img/delete-icon.gif';
import PropertyServices from '@/services/PropertyServices';
import { format } from 'date-fns';
import { HttpStatusCode } from 'axios';
import { showToast } from '@/utils/common-service';
import { TOAST_TYPE } from '@/constants/toast-constant';
import { ERROR_MSG } from '@/constants/error-msg';

function Booking() {
    const [propertyData, setPropertyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const itemsPerPage = 10;
    const apiUrl = import.meta.env.VITE_API_URL;

    const getProperty = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await PropertyServices.getProperty(token);
            setPropertyData(res.data.data);
        } catch (err) {
            console.error("error to read property data: ", err);
        }
    };

    useEffect(() => {
        getProperty();
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = propertyData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(propertyData.length / itemsPerPage);

    // For delete
    const handleDeleteClick = (id) => {
        setSelectedPropertyId(id);
        setIsDeleteModalOpen(true);
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await PropertyServices.daleteProperty(selectedPropertyId, token)
            if (res?.data?.status == HttpStatusCode.Ok) {
                getProperty()
                showToast(TOAST_TYPE.SUCCESS, res.data.message)
            } else {
                showToast(TOAST_TYPE.FAILURE, ERROR_MSG.INTERNAL_SERVER_ERR)
            }
        } catch (err) {
            console.error("delete property error", err);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <div>
            <div className='h-16 w-full flex justify-between mb-8'>
                <p className='text-xl font-semibold flex items-center'>Property Details</p>
                <Link to="/admin-dashboard/property-form">
                    <Button variant="filled" className='mx-2 my-2'>Add Property</Button>
                </Link>
            </div>
            <div>
                <Card>
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">Property Table</Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["property", "city", "price", "date of added", ""].map((el) => (
                                        <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(({ id, propertyName, propertyType, propertyImages, city, price, createdAt }, key) => {
                                    const className = `py-3 px-5 ${key === currentItems.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                                    return (
                                        <tr key={id}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={`${apiUrl}/${propertyImages[0]}`} alt={propertyName} size="sm" variant="rounded" />
                                                    <div>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {propertyName}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {propertyType}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {city}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {price}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {format(new Date(createdAt), "d/M/yyyy")}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Menu>
                                                    <MenuHandler>
                                                        <IconButton variant="text" color="blue-gray" className='w-8 h-8'>
                                                            <EllipsisVerticalIcon className="h-6 w-6 text-blue-gray-500" />
                                                        </IconButton>
                                                    </MenuHandler>
                                                    <MenuList className='w-20'>
                                                        <Link to={`/admin-dashboard/property-view/${id}`}>
                                                            <MenuItem className="flex items-center gap-2">
                                                                <p><img src={eyeIcon} className='h-5 w-5' /></p>
                                                                <p>View</p>
                                                            </MenuItem>
                                                        </Link>
                                                        <Link to={`/admin-dashboard/property-edit/${id}`}>
                                                            <MenuItem className="flex items-center gap-2">
                                                                <p><img src={editIcon} className='h-5 w-5' /></p>
                                                                <p>Edit</p>
                                                            </MenuItem>
                                                        </Link>
                                                        <MenuItem className="flex items-center gap-2" onClick={() => handleDeleteClick(id)}>
                                                            <p><img src={deleteIcon} className='h-5 w-5' alt='Delete Icon' /></p>
                                                            <p>Delete</p>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
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
                    </CardBody>
                </Card>
            </div>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this item?</p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
