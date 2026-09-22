import { BedIcon, EyeIcon, Fullscreen, HomeIcon, SoupIcon, StarIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function RoomCard({ fromSearchPage, room, checkin, checkout }) {
  const {
    _id,
    title,
    image,
    bed_type,
    reviews = [],
    max_occupancy,
    size,
    price,
    meal,
    view,
    grading,
    average_rating,
    roomAvailable,
  } = room || {};

  // 1. Safe URL Construction with Guard Clause
  const getRoomDetailsUrl = () => {
    if (!_id) return "#"; 

    const baseUrl = `/${_id}`; 

    if (fromSearchPage && checkin && checkout) {
      const params = new URLSearchParams({
        checkin: String(checkin),
        checkout: String(checkout),
      });
      return `${baseUrl}?${params.toString()}`;
    }

    return baseUrl;
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row mb-5 group">
      
      {/* 1. Image Section */}
      <div className="relative w-full md:w-72 h-52 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
        <Image
          src={image || "/placeholder.jpg"}
          alt={title || "Room Image"}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          priority
        />
        
        {fromSearchPage && roomAvailable > 0 && (
          <Badge className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-lg border-0 shadow-sm">
            <HomeIcon className="w-3.5 h-3.5 mr-1 inline-block" />
            <span>{roomAvailable} Left</span>
          </Badge>
        )}
      </div>

      {/* 2. Main Content & Actions Container */}
      <div className="p-5 flex-1 flex flex-col justify-between md:flex-row gap-6">
        
        {/* Left Side Details */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 capitalize tracking-tight group-hover:text-teal-700 transition-colors">
              {title || "Untitled Room"}
            </h3>

            {/* Feature Chips / Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                <BedIcon className="w-3.5 h-3.5 text-teal-600" />
                <span className="capitalize">{bed_type || "N/A"} Bed</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>{max_occupancy || 0} Guests</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                <Fullscreen className="w-3.5 h-3.5 text-teal-600" />
                <span>{size || 0} m²</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                <EyeIcon className="w-3.5 h-3.5 text-teal-600" />
                <span className="capitalize">{view || "Standard"}</span>
              </span>
            </div>
          </div>

          {/* Perks / Inclusions */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 w-fit px-2.5 py-1 rounded-md border border-emerald-200/50">
            <SoupIcon className="w-3.5 h-3.5" />
            <span className="capitalize">{meal ? meal : "Breakfast Included / Custom Meal"}</span>
          </div>
        </div>

        {/* Right Side Pricing & Action */}
        <div className="flex md:flex-col justify-between items-end md:justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0 min-w-[170px]">
          
          {/* Rating Badge */}
          <div className="flex items-center md:items-end flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">
                {reviews?.length || 0} reviews
              </span>
              {grading && (
                <span className="bg-amber-500 text-white font-bold text-xs px-2 py-0.5 rounded capitalize shadow-sm">
                  {grading}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-amber-500 mt-1">
              <StarIcon className="w-4 h-4 fill-amber-400" />
              <span className="text-sm font-bold text-slate-800">{average_rating || "4.8"}</span>
            </div>
          </div>

          {/* Pricing & CTA Button */}
          <div className="text-right w-full mt-auto">
            <div className="mb-2">
              <span className="text-2xl font-black text-slate-900">${price || 0}</span>
              <span className="text-xs text-slate-400 font-medium"> /night</span>
            </div>

            <Link
              href={getRoomDetailsUrl()}
              className={`w-full inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/20 capitalize ${
                !_id ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {fromSearchPage ? "See Details" : "See Availability"}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}