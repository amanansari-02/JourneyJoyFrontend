import { ERROR_MSG } from '@/constants/error-msg';
import { TOAST_TYPE } from '@/constants/toast-constant';
import PropertyServices from '@/services/PropertyServices';
import { showToast } from '@/utils/common-service';
import { adminDashboard, property } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import { HttpStatusCode } from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ImageUploading from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const propertySchema = z.object({
  propertyName: z.string().min(1, ERROR_MSG.PROPERTY_NAME_REQUIRED),
  propertyType: z.string().min(1, { message: ERROR_MSG.PROPERTY_TYPE_REQUIRED }),
  price: z.coerce.number().min(1000, ERROR_MSG.PROPERTY_PRICE),
  location: z.string().min(1, ERROR_MSG.LOCATION),
  description: z.string().nullable(),
  rooms: z.coerce.number().min(1, ERROR_MSG.ROOMS),
  city: z.string().min(1, ERROR_MSG.CITY),
  noOfGuests: z.coerce.number().min(1, ERROR_MSG.NO_OF_GUESTS),
  propertyImages: z.any().optional()
})

function PropertyForm() {
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const maxNumber = 69;

  const onSubmit = async (data) => {
    try {
      const imageFiles = images.map((img) => img.file);
      const allData = { ...data }
      const formData = new FormData()
      for (const key in allData) {
        formData.append(key, allData[key])
      }
      imageFiles.forEach((file, index) => {
        formData.append(`propertyImages`, file);
      });

      const res = await PropertyServices.addProperty(formData)
      if (res?.data?.status == HttpStatusCode.Created) {
        navigate(`${adminDashboard}${property}`)
        showToast(TOAST_TYPE.SUCCESS, res.data.message)
      } else {
        showToast(TOAST_TYPE.FAILURE, ERROR_MSG.INTERNAL_SERVER_ERR)
      }

    } catch (error) {
      console.error("error", error);
    }
  }

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(propertySchema)
  })

  return (
    <div className="mt-4 p-4">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* First Row: Property Name and Property Type */}
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
          <div className="flex flex-col gap-2 sm:w-1/2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Property Name
            </Typography>
            <Input
              size="lg"
              placeholder="Greenary Hotel"
              className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('propertyName')}
            />
            {errors?.propertyName && <span className='text-red-500'>{errors?.propertyName?.message}</span>}
          </div>

          <div className="flex flex-col gap-2 sm:w-1/2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Property Type
            </Typography>
            <Controller
              name="propertyType"
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
                  <Option value="Hotel">Hotel</Option>
                  <Option value="Villa">Villa</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
            />
            {errors?.propertyType && <span className='text-red-500'>{errors?.propertyType?.message}</span>}
          </div>
        </div>

        {/* Second Row: Property Price and Location */}
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
          <div className="flex flex-col gap-2 sm:w-1/2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Property Price
            </Typography>
            <Input
              type='number'
              size="lg"
              placeholder="150000"
              className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('price')}
            />
            {errors?.price && <span className='text-red-500'>{errors?.price?.message}</span>}
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
              {...register('noOfGuests')}
            />
            {errors?.noOfGuests && <span className='text-red-500'>{errors?.noOfGuests?.message}</span>}
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2 sm:w-1/2">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Location
          </Typography>
          <Input
            size="lg"
            placeholder="6, Nr Jalram Temple, Tribhuvan Terrace, Station Rd, Kandivli(w)"
            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register('location')}
          />
          {errors?.location && <span className='text-red-500'>{errors?.location?.message}</span>}
        </div>

        {/* description */}
        <div className="flex flex-col gap-2">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Description
          </Typography>
          <Textarea
            size="lg"
            placeholder="The Perfect Stays Mountain Paradise Villa is situated in Lonavala. Featuring a 24-hour front desk, this property also provides guests with an outdoor fireplace."
            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register('description')}
          />
          {errors?.description && <span className='text-red-500'>{errors?.description?.message}</span>}
        </div>

        {/* Third Row: Total Rooms and City */}
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
          <div className="flex flex-col gap-2 sm:w-1/2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Total Rooms
            </Typography>
            <Input
              type='number'
              size="lg"
              placeholder="5"
              className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('rooms')}
            />
            {errors?.rooms && <span className='text-red-500'>{errors?.rooms?.message}</span>}
          </div>

          <div className="flex flex-col gap-2 sm:w-1/2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              City
            </Typography>
            <Input
              size="lg"
              placeholder="Pune"
              className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('city')}
            />
            {errors?.city && <span className='text-red-500'>{errors?.city?.message}</span>}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col gap-2">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Upload Images
          </Typography>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={['jpg', 'png', 'jpeg']}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  type="button"
                  className="border border-dashed border-gray-400 p-4 rounded w-full text-center"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drag & Drop here
                </button>
                <div className="grid gap-4 sm:grid-cols-3 grid-cols-1 mt-4">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image['data_url']}
                        alt="img"
                        className="object-cover shadow rounded w-full !max-h-48"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 opacity-75 group-hover:opacity-100"
                        onClick={() => onImageRemove(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
          {errors?.propertyImages && <span className='text-red-500'>{errors?.propertyImages?.message}</span>}
        </div>
        <div className='flex justify-end items-end mr-12' >
          <Button type="submit" >Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
