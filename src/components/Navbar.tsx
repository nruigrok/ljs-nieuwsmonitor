"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 backdrop-blur-sm bg-background-transparent sticky top-0 z-20 border-b-2 ">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-foreground">
              <Links />
            </ul>
            <FoldedMenu />
          </div>
        </div>
      </div>
    </>
  );
};

const Links = () => {
  return (
    <>
      <li>
        <NavItem route="/over">Over LJS</NavItem>
      </li>
      <li>
        <NavItem route="/projecten">Projecten</NavItem>
      </li>
      <li>
        <NavItem route="/contact">Neem contact op</NavItem>
      </li>
    </>
  );
};

const NavItem = (props: { children: React.ReactNode; route: string }) => {
  const pathname = usePathname();
  const isActive = pathname === props.route;

  return (
    <Link href={props.route}>
      <button
        className={`mx-4 p-1 rounded-full from-primary via-background to-secondary  ${
          isActive && "bg-gradient-to-br"
        } hover:bg-gradient-to-bl`}
      >
        <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-background-transparent transition">
          {props.children}
        </span>
      </button>
    </Link>
  );
};

const FoldedMenu = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (show) {
      ref.current.style.gridTemplateRows = ref.current.scrollHeight + "px";
      ref.current.style.padding = "1rem 0";
    } else {
      ref.current.style.gridTemplateRows = "0px";
      ref.current.style.padding = "0";
    }
  }, [ref, show]);

  return (
    <div className="relative">
      <Button
        className={`p-1 ${show ? "" : "md:hidden"}`}
        onClick={() => setShow(!show)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
        </svg>
      </Button>
      <div
        ref={ref}
        onClick={() => setShow(false)}
        className={`grid grid-rows-[0px] transition-all fixed w-full top-20 left-0 bg-primary overflow-hidden py-0`}
      >
        <ul className="flex flex-col items-center ">
          <Links />
        </ul>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-x-3 h-28 w-28 ">
      <Link href="/">
        <img src="/images/logo_transparent.png" alt="logo" className="p-2" />
      </Link>
    </div>
  );
};

export default Navbar;
