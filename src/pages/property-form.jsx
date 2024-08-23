import { Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

function PropertyForm() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  console.log("images", images);
  

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <div className="mt-4 p-4">
      <form className="space-y-6">
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
            />
          </div>

          <div className="flex flex-col gap-2 sm:w-1/2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Property Type
            </Typography>
            <Select size='lg' label="Select Property Type">
              <Option>Hotel</Option>
              <Option>Villa</Option>
              <Option>Other</Option>
            </Select>
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
            />
          </div>

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
            />
          </div>
        </div>

        {/* Description */}
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
          />
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
            />
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
            />
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
            acceptType={['jpg', 'png']}
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
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
