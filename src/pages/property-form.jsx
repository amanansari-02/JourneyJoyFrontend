import { Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function PropertyForm() {

  const onDrop = useCallback((acceptedFiles) => {
    // Handle the files here
    console.log('Accepted files:', acceptedFiles);
    // You can perform further actions such as uploading files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

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
            <Select size='lg' label="Select Property Type"
            >
              <Option>Hotel</Option>
              <Option>Villa</Option>
              <Option>Other</Option>
            </Select>
          </div>
        </div>

        {/* Second Row: Your Address */}
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
              placeholder=" 6, Nr Jalram Temple, Tribhuvan Terrace, Station Rd, Kandivli(w)"
              className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>

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

        <div className="flex  gap-2 justify-center">
          {/* <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-gray-300 rounded-lg"> */}
            <div {...getRootProps()} className={` w-[90%] h-24 bg-[#F5F5F5] p-4 text-center ${isDragActive ? 'bg-blue-gray-100' : 'bg-gray-50'} border-2 border-dashed border-blue-gray-300 rounded-lg cursor-pointer`}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-gray-600 text-center flex justify-center">Drop the images here ...</p>
              ) : (
                <p className="text-blue-gray-600 text-center flex justify-center">Drag 'n' drop some images here, or click to select images</p>
              )}
            </div>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
