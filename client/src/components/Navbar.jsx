"use client";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReceiptIndianRupee } from 'lucide-react';

export function NavbarComponent() {
  const pathname = usePathname(); // Get the current route

  const getLinkClass = (path) =>
    pathname === path
      ? "text-white font-semibold scale-110 transition-transform duration-300"
      : "text-gray-300 hover:text-white hover:scale-110 transition-transform duration-300";

  return (
    // <Navbar fluid className="dark">
    //   <Link href="/">
    //     {/* <img src="shortw.png" className="mr-3 h-6 sm:h-9" alt="Logo" /> */}
    //     <ReceiptIndianRupee className="size-10"/>
    //   </Link>
    //   <Navbar.Collapse className="relative left-10 md:left-0">
    //     <Link href="/" className={getLinkClass("/")}>
    //       Home
    //     </Link>
    //     <Link href="#about" className={getLinkClass("/about")}>
    //       About
    //     </Link>
    //     <Link href="/product" className={getLinkClass("/product")}>
    //       Product
    //     </Link>
    //     <Link href="/pricing" className={getLinkClass("/pricing")}>
    //       Pricing
    //     </Link>
    //     <Link href="/contact" className={getLinkClass("/contact")}>
    //       Contact
    //     </Link>
    //   </Navbar.Collapse>
    // </Navbar>
    <Navbar fluid rounded>
    <Navbar.Brand as={Link} href="https://flowbite-react.com">
      {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />*/}
      <ReceiptIndianRupee className="size-10"/>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white hidden md:block">FinanceVisualizer</span> 
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Navbar.Link href="#" active>
        Home
      </Navbar.Link>
      <Navbar.Link as={Link} href="#">
        About
      </Navbar.Link>
      <Navbar.Link href="#">Services</Navbar.Link>
      <Navbar.Link href="#">Pricing</Navbar.Link>
      <Navbar.Link href="#">Contact</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
  );
}
