import { dashboard, signUp } from "../utils/route";
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
import { showToast } from "@/utils/common-service";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";

const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
})

export function ForgotPassword() {

    const navigate = useNavigate();
    const signUpPath = `/${signUp}`;
    const dasboardPath = `/${dashboard}`;

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log("Data", data);

    }

    return (
        <section className="m-8 flex gap-4">
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-6">Forgot Password</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email for forgot password link.</Typography>
                </div>
                <form className="mt-8 mb-4 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 flex flex-col gap-2">
                        <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                            Your email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-600 ">{errors.email.message}</p>}

                    </div>
                    <Button className="mt-10" fullWidth type="submit">
                        Sign In
                    </Button>

                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
                        Remember you password
                        <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
                    </Typography>

                </form>

            </div>
            <div className="w-2/5 h-full hidden lg:block">
                <img
                    src="img/background-4.jpg"
                    className="h-full w-10/12 object-cover rounded-3xl"
                />
            </div>

        </section>
    );
}

export default ForgotPassword;
