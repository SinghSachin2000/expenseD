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
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-transparent fixed">
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
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Dashboard", path: "/dashboard" },
        ].map((item) => (
          <NavbarItem key={item.name} isActive={activeLink === item.name}>
            <RouterLink
              to={item.path}
              className={
                activeLink === item.name ? "text-[#ef6407]" : "text-white"
              }
              onClick={() => handleLinkClick(item.name)}
            >
              {item.name}
            </RouterLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <RouterLink to="/login" className="hidden lg:flex text-white">
          <NavbarItem>Login</NavbarItem>
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
            <RouterLink
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={`w-full ${
                activeLink === item ? "text-[#ef6407]" : "text-white"
              }`}
              onClick={() => handleLinkClick(item)}
            >
              {item}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
