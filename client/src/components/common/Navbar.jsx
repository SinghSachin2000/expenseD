import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const menuItems = [
    "Profile",
    "Dashboard",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-transparent">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <RouterLink to="/">
          <NavbarBrand>
            <p className=" text-2xl font-bold text-[#ef6407]">
              SLICE
              <span className="text-white">MATE</span>
            </p>
          </NavbarBrand>
        </RouterLink>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {["Home", "About", "Dashboard"].map((item) => (
          <NavbarItem key={item} isActive={activeLink === item}>
            <Link
              href="#"
              aria-current={activeLink === item ? "page" : undefined}
              className={activeLink === item ? "text-[#ef6407]" : "text-white"}
              onClick={() => handleLinkClick(item)}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <RouterLink to="/login">
          <NavbarItem className="hidden lg:flex">
            <Link className="text-white">Login</Link>
          </NavbarItem>
        </RouterLink>
        <RouterLink to="/signup">
          <NavbarItem>
            <Button color="primary" variant="flat" className="text-[#ef6407]">
              Sign Up
            </Button>
          </NavbarItem>
        </RouterLink>
      </NavbarContent>
      <NavbarMenu className="bg-[#303841] opacity-95">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className={`w-full  ${
                activeLink === item ? "text-[#ef6407]" : "text-white"
              }`}
              href="#"
              size="lg"
              onClick={() => handleLinkClick(item)}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
