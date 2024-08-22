import { ERROR_MSG } from "@/constants/error-msg";
import { TOAST_TYPE } from "@/constants/toast-constant";
import UserService from "@/services/UserService";
import { setItemToLocalStorage, showToast } from "@/utils/common-service";
import { signIn } from "@/utils/route";
import { CONST_MSG, SIGN_UP } from "@/utils/text-content";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

export function SignUp() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null)
  const [dragging, setDragging] = useState(false);

  const schema = z.object({
    Name: z.string().min(4, ERROR_MSG.NAME_REQUIRED),
    Email: z.string().min(1, ERROR_MSG.EMAIL_REQUIRED).email(ERROR_MSG.INVALID_EMAIL),
    Password: z.string().min(1, ERROR_MSG.PASSWORD_REQUIRED),
    PhoneNo: z.string().min(10, ERROR_MSG.INVALID_MOBILE_NUM),
    ProfilePhoto: z.any().optional()
  })

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const allData = {
        ...data,
        IsEmailLogin: 2,
      }
      const formData = new FormData()
      for (const key in allData) {
        formData.append(key, allData[key])
      }
      const res = await UserService.userCreate(formData)
      if (res?.data?.status == HttpStatusCode.Created) {
        setItemToLocalStorage('user', formData)
        navigate(signIn)
        showToast(TOAST_TYPE.SUCCESS, res.data.message)
      } else if (res?.data?.status == HttpStatusCode.BadRequest) {
        showToast(TOAST_TYPE.FAILURE, res.data.error)
      } else {
        showToast(TOAST_TYPE.FAILURE, ERROR_MSG.USER_NOT_ADDED)
      }

    } catch (err) {
      console.error("error: ", err)
    }
  }

  const handleImageChange = (event) => {
    let imageFile;
    if (event.target.files && event.target.files[0]) {
      imageFile = event.target.files[0];
    } else if (event.dataTransfer && event.dataTransfer.files[0]) {
      imageFile = event.dataTransfer.files[0];
    }

    if (imageFile) {
      setSelectedImage(imageFile);
      setValue("ProfilePhoto", imageFile)
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    handleImageChange(event);
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/bg-img-mobile.jpeg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            {SIGN_UP.INPUT_1}
          </Typography>
          <div
            className={`flex items-center justify-center w-full mt-5 ${dragging ? 'border-blue-500' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          {selectedImage && (
            <div className="flex items-center justify-center w-[40%] mt-5">
              {typeof selectedImage === 'string' ? (
                <img src={selectedImage} alt="Selected" className="rounded-lg" />
              ) : (
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="rounded-lg" />
              )}
            </div>
          )}

          <div className="mb-1 flex flex-col gap-3 mt-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              {SIGN_UP.INPUT_2}
            </Typography>
            <Input
              size="lg"
              placeholder="Alexander Lucci"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('Name')}
            />
            {errors.Name && <p className="text-red-600">{errors.Name.message}</p>}
          </div>
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="mt-2 font-medium">
              {CONST_MSG.YOUR_EMAIL}
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('Email')}
            />
            {errors.Email && <p className="text-red-600">{errors.Email.message}</p>}
          </div>
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="mt-2 font-medium">
              {CONST_MSG.PASSWORD}
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('Password')}
            />
            {errors.Password && <p className="text-red-600">{errors.Password.message}</p>}
          </div>
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="mt-2 font-medium">
              {SIGN_UP.INPUT_3}
            </Typography>
            <Input
              type="number"
              size="lg"
              placeholder="9999999999"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('PhoneNo')}
            />
            {errors.PhoneNo && <p className="text-red-600">{errors.PhoneNo.message}</p>}
          </div>

          <Button className="mt-6" fullWidth type="submit">
            {SIGN_UP.BUTTON_1}
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            {SIGN_UP.TEXT_1}
            <Link to="/sign-in" className="text-gray-900 ml-1">{SIGN_UP.LINK_1}</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
