'use client'

import Link from "next/link";
import DropDownList from "./drop-down-list";
import { useState } from "react";

export default function MobileNavbar({categories,isOpen,onClose}) {
 
  function navClose(){
      onClose(!isOpen)
  }
  return (
    <div  className={`block md:hidden absolute top-20 left-0 z-10 w-full h-[350px] font-semibold shadow-lg rounded-sm text-slate-800 bg-slate-800 p-8 transform transition-transform duration-700 ease-in-out will-change-[transform,opacity] ${
      isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
    }`}
    style={{ willChange: 'transform, opacity' }}
    >
      <nav className="mt-6 w-full text-white">
        <div className="flex flex-col gap-6">
          <Link onClick={navClose} href="/">home</Link>
          <DropDownList onDropClose={navClose} categories={categories}/>
          <Link href="#" onClick={navClose} className="">
            bookings
          </Link>
          <Link href="#" onClick={navClose}>
            contact us
          </Link>
          <Link href="#" onClick={navClose}>
            About us
          </Link>
        </div>
      </nav>
    </div>
  );
}
