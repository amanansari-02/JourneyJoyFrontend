import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../images/logo.png"
import linkName from "../../components/common/homeNavigate"

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const onLinkClick = (name) => {
    const scrollToName = linkName.find((link) => link === name);
    if (scrollToName) {
      setTimeout(() => {
        const element = document.getElementById(scrollToName);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target, value }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
              onClick={() => onLinkClick(value)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
          {brandName}
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse
        className="rounded-xl bg-white pl-5  text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </Collapse >
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: (
    <img
      src={logo}
      alt="Logo"
      height={100}
      width={100}
    />
  ),
  action: (
    <a
      target="_blank"
    >
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.node,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
