import Image from "next/image";
import Link from "next/link";
import visa from "../../public/visa.png";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-midnight text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Luxurious Hotel
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            All hotels and vacation rental properties listed on this website.
          </p>
          <div className="pt-2">
            <Image
              className="w-28 h-auto object-contain"
              src={visa}
              alt="Visa and Payment Gateways"
            />
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-white tracking-wide mb-1">
            For Customers
          </h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-amber-400 transition-colors">About Luviana</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Customer Care/Help</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Corporate Accounts</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Financial Information</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 3: Recent News */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-white tracking-wide mb-1">
            Recent News
          </h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Our Secret Island Boat Tour</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">September in Luxurious Hotel</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Live Music Concerts at Luxurious</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-3 text-sm">
          <h2 className="text-lg font-semibold text-white tracking-wide mb-1 capitalize">
            Contact Us
          </h2>
          <div className="flex items-start gap-2.5 text-gray-400">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>3015 Grand Avenue, NY</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-400">
            <Mail className="w-4 h-4 text-amber-500 shrink-0" />
            <a href="mailto:hello@luxurius.com" className="hover:text-amber-400 transition-colors">
              hello@luxurius.com
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-gray-400">
            <Phone className="w-4 h-4 text-amber-500 shrink-0" />
            <a href="tel:+889218219812" className="hover:text-amber-400 transition-colors">
              +889218219812
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-gray-400">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>24/7 Customer Service</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/80 bg-black/20 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Hotel Paradise. All rights reserved.
      </div>
    </footer>
  );
}