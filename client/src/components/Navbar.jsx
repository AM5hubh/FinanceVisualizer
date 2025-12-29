"use client";
import { Avatar, NavbarBrand, Dropdown, Navbar, Button } from "flowbite-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export function NavbarComponent() {
  const { user, logout, userdetails } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure it only runs on the client
  }, []);

  if (!isMounted) return null;

  return (
    <Navbar fluid rounded className="dark fixed w-full top-0 z-50">
      <NavbarBrand as={Link} href="/">
        <img src="favicon.ico" className="h-8 mr-3" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          FinanceVisualizer
        </span>
      </NavbarBrand>

      {user ? (
        <div className="flex md:order-3">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm ">
                {userdetails?.username || "loading..."}
              </span>
              <span className="block truncate text-sm font-medium">
                {userdetails?.email || "loading..."}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <div className="flex md:order-2">
          <Link href="/auth/signup">
            <Button>Get started</Button>
          </Link>
          {/* <Navbar.Toggle /> */}
        </div>
      )}
    </Navbar>
  );
}
