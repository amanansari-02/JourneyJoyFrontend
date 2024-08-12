import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { contactUs, ourTeam } from "@/utils/route";
import { CONST_MSG, DASHBOARD_TEXT_CONTENT, HOME_TEXT_CONTENT } from "@/utils/text-content";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthServices from "@/services/AuthServices";
import { HttpStatusCode } from "axios";
import { showToast } from "@/utils/common-service";
import { BeatLoader } from "react-spinners";

const contactSchema = z.object({
  FullName: z.string().min(1, "Name is required"),
  Email: z.string().min(1, "Email is required").email("Invalid email address"),
  Message: z.string().nullable()
})

export function Home() {

  const [enquiryLoader, setEnquiryLoader] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    try {
      setEnquiryLoader(true)
      const contactUs = await AuthServices.contactUsForm(data)
      if (contactUs?.data?.status == HttpStatusCode.Ok) {
        reset();
        showToast('SUCCESS', contactUs?.data?.message)
      } else {
        showToast('FAILURE', CONST_MSG.INTERNAL_SERVER_ERROR)
      }

    } catch (err) {
      console.error("Err", err);
    } finally {
      setEnquiryLoader(false)
    }
  }

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-2.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                {DASHBOARD_TEXT_CONTENT.TEXT_1}
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                {DASHBOARD_TEXT_CONTENT.TEXT_2}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                {HOME_TEXT_CONTENT.TEXT_1}
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                {HOME_TEXT_CONTENT.TEXT_2}
                <br />
                <br />
                {HOME_TEXT_CONTENT.TEXT_3}
              </Typography>
              <Button variant="filled" className="btnStyle">{HOME_TEXT_CONTENT.BUTTON_2}</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    {HOME_TEXT_CONTENT.NOTCH_SERVICE.TEXT_1}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {HOME_TEXT_CONTENT.NOTCH_SERVICE.TEXT_2}
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48" id={ourTeam}>
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Meet Our Adventure Experts">
            {HOME_TEXT_CONTENT.TEAM.TEXT_1}
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white py-12 px-4">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Inspire Innovation">
            {HOME_TEXT_CONTENT.CO_WORKING.TEXT_1}
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <section id={contactUs}>
            <PageTitle section="Contact Us" heading="Get in Touch">
              {HOME_TEXT_CONTENT.CONTACT_US.TEXT_1}
            </PageTitle>
            <form className="mx-auto w-5/6 max-w-lg mt-12 lg:w-5/12" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8 flex flex-col md:flex-row gap-8">
                <div className="flex flex-col w-full md:w-1/2">
                  <Input variant="outlined" size="md" label="Full Name" {...register('FullName')} />
                  {errors.FullName && <p className="text-red-600">{errors.FullName.message}</p>}
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <Input variant="outlined" size="md" label="Email Address" {...register('Email')} />
                  {errors.Email && <p className="text-red-600">{errors.Email.message}</p>}
                </div>
              </div>
              <Textarea variant="outlined" size="lg" label="Message" rows={8} {...register('Message')} />
              <Button variant="gradient" size="lg" className="mt-8" fullWidth type="submit">
                {enquiryLoader ? <BeatLoader /> : HOME_TEXT_CONTENT.BUTTON_1}
              </Button>
            </form>
          </section>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
