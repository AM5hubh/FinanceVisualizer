"use client";

import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import Link from "next/link";
// import {useRouter} from "next/navigation";
import { SignupForm } from "./signupform";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export function NavbarComponent() {
  // const router = useRouter();
  const { user, logout, userdetails } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure it only runs on the client
  }, []);

  if (!isMounted) return null;
  // const handlelogout = () => {
  //   localStorage.removeItem("token");
  //   router.push("/auth/login");
  // };
  return (
    <Navbar fluid rounded className="dark fixed w-full top-0 z-50">
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          FinanceVisualizer
        </span>
      </Navbar.Brand>

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
              <span className="block text-sm">{userdetails?.username || "loading..."}</span>
              <span className="block truncate text-sm font-medium">
                {userdetails?.email || "loading..."}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider /> */}
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
          {/* <Navbar.Toggle /> */}
        </div>
      ) : (
        <div className="flex md:order-2">
          <Link href="/auth/signup">
            <Button>Get started</Button>
          </Link>
          {/* <Navbar.Toggle /> */}
        </div>
      )}

      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
