import { dashboard, forgotPassword, signUp, home } from "../utils/route";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import AuthServices from "@/services/AuthServices";
import { HttpStatusCode } from "axios";
import { setItemToLocalStorage, showToast } from "@/utils/common-service";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import { ERROR_MSG } from "@/constants/error-msg";
import { TOAST_TYPE } from "@/constants/toast-constant";
import { CONST_MSG, SIGN_IN } from "@/utils/text-content";

const schema = z.object({
  Email: z.string().min(1, ERROR_MSG.EMAIL_REQUIRED).email(ERROR_MSG.INVALID_EMAIL),
  Password: z.string().min(1, ERROR_MSG.PASSWORD_REQUIRED)
})

export function SignIn() {

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const userData = {
          Email: user?.email || '',
          IsEmailLogin: 1,
          Name: user?.displayName || '',
          PhoneNo: user?.phoneNumber || '',
          ProfilePhoto: user?.photoURL || '',
        }
        const formData = new FormData()
        for (const key in userData) {
          formData.append(key, userData[key])
        }
        const res = await AuthServices.userLogin(formData);

        const data = JSON.stringify(res.data.data)
        if (res.data.status == HttpStatusCode.Ok) {
          setItemToLocalStorage('user', data)
          navigate(dashboard)
          showToast(TOAST_TYPE.SUCCESS, res.data.message)
        }
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
      });
  };


  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const allData = {
        ...data,
        IsEmailLogin: 2
      }
      const formData = new FormData()
      for (const key in allData) {
        formData.append(key, allData[key])
      }

      const res = await AuthServices.userLogin(formData);
      const userData = JSON.stringify(res.data.data)
      const status = res.data.status

      if (status == HttpStatusCode.Ok) {
        const role = res.data.data.role

        setItemToLocalStorage('user', userData)
        if (role == 1) {
          navigate("/admin-dashboard" + home)
        } else if (role == 2) {
          navigate(dashboard)
        }
        showToast(TOAST_TYPE.SUCCESS, res.data.message)
      } else if (status == HttpStatusCode.BadRequest) {
        showToast(TOAST_TYPE.FAILURE, res.data.error)
      } else {
        showToast(TOAST_TYPE.FAILURE, ERROR_MSG.INTERNAL_SERVER_ERR)
      }
    } catch (error) {
      console.log("err", error);
    }
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">{CONST_MSG.SIGN_IN}</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">{SIGN_IN.TEXT_1}</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              {CONST_MSG.YOUR_EMAIL}
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('Email')}
            />
            {errors.Email && <p className="text-red-600 ">{errors.Email.message}</p>}
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
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
          <Button className="mt-6" fullWidth type="submit">
            {CONST_MSG.SIGN_IN}
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to={forgotPassword} className="text-gray-900 ml-1">{SIGN_IN.LINK_1}</Link>
            </Typography>
          </div>
          <div className="space-y-4 mt-8">
            <Button onClick={handleGoogleSignUp} size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>{SIGN_IN.SIGN_IN_GOOGLE}</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            {SIGN_IN.TEXT_2}
            <Link to={signUp} className="text-gray-900 ml-1">{SIGN_IN.LINK_2}</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/bg-img-mobile.jpeg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
