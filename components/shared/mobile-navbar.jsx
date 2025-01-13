'use client'

import Link from "next/link";
import DropDownList from "./drop-down-list";

export default function MobileNavbar({categories,isOpen,onClose}) {
 
  function navClose(){
      onClose(!isOpen)
  }
  return (
    <div  className={`block md:hidden absolute top-16 left-0 z-10 w-full font-semibold shadow-lg bg-[#222f3e] p-8 overflow-hidden transform transition-all duration-700 ease-in-out ${
      isOpen ? "translate-x-0 opacity-100 max-h-[500px]" : "-translate-x-full opacity-0 max-h-0"
    }`}
    >
      <nav className="mt-2 w-full text-white">
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
