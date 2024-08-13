import { Home, Profile, SignIn, SignUp } from "@/pages";
import { home, ourTeam, contactUs, signIn } from "./utils/route";

export const routes = [
  {
    name: "home",
    value: `${home}`,
    path: `${home}`,
    element: <Home />
  },
  {
    name: "Our team",
    value: `${ourTeam}`,
    path: `${home}#${ourTeam}`
  },
  {
    name: "Contact Us",
    value: `${contactUs}`,
    path: `${home}#${contactUs}`
  },
  {
    name: "Log In",
    value: `${signIn}`,
    path: `${signIn}`,
    element: <SignIn />
  }
];

export default routes;
