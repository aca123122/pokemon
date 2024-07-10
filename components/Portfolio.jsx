'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-left sm:flex gap-4"> ALYRA CASTILLON ANDAL</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Background
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Design
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Current Works
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
