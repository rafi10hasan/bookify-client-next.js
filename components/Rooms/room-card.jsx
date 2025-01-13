import { ratingGrade } from "@/utils/ratingGrade";
import {  BedIcon, BookCheck, EyeIcon, Fullscreen, HomeIcon, SoupIcon, StarIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function RoomCard({ fromSearchPage, room ,checkin,checkout}) {
  const { _id, title, image, bed_type, reviews, max_occupancy, size, price, meal, view , grading , average_rating } = room;

  return (
    <div className="w-full h-auto grid grid-cols-6 md:grid-cols-9 gap-1 md:gap-6 space-y-4 space-x-2 bg-[#fffffa] p-3 shadow-lg rounded-sm">
      <div className="col-span-6 md:col-span-4">
        <Image
          src={image}
          className="rounded-sm object-cover h-[300px] w-full"
          width={400}
          height={300}
          alt={title}
        />
      </div>

      <div className="col-span-3 text-gray-800 mt-4">
        {/* first */}
        <div className="space-y-[5px] lg:space-y-2">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="flex gap-2 mb-2">
            <BedIcon className="text-deep-cyan" />
            <span>{bed_type}</span>
          </div>
          <div className="flex gap-2">
            <User className="text-deep-cyan" />
            <span>{max_occupancy}</span>
          </div>
          <div className="flex gap-2">
            <Fullscreen className="text-deep-cyan" />
            <span>
              {size} m<sup>2</sup>
            </span>
          </div>
          <div className="flex gap-2">
            <EyeIcon className="text-deep-cyan" />
            <h2>{view}</h2>
          </div>
          <div className="flex gap-2">
            <SoupIcon className="text-deep-cyan" />
            {meal
              ?  <h2>{meal}</h2>
              : "no meal included"}
          </div>
          <div className="">
            <h4 className="text-xl text-deep-yellow font-semibold">{price}$ per night</h4>
          </div>
          {fromSearchPage && (
            <div>
              <Badge className="tracking-widest bg-deep-cyan space-x-1">
                <span>{room.roomAvailable}</span><HomeIcon className="block size-4 space-y-1 md:hidden"/> <span className="hidden md:block"> accommodation </span> <span>available</span>
              </Badge>
            </div>
          )}
        </div>
        {/* second */}
      </div>
      <div className="justify-self-center col-span-3 md:col-span-2  space-y-3 mt-4 ">
        <Badge className="font-semibold bg-deep-yellow">{grading}</Badge>
        <div className="flex gap-2 text-deep-yellow font-semibold">
          <StarIcon className="size-5 " />
          <p>{average_rating}</p>
        </div>
        <div className="flex gap-2">
          <BookCheck className="size-5 text-deep-yellow" />
          <p>{reviews.length} reviews</p>
        </div>
        <div className="align-self-end mt-2">
          {fromSearchPage ? (
            <Link
              href={`/${_id}?checkin=${checkin}&checkout=${checkout}`}
              className="bg-midnight text-white rounded-sm mt-2 p-2 tracking-wide"
            >
              see details
            </Link>
          ) : (
            <Link href={`/${_id}`} className="bg-midnight text-white rounded-sm mt-2 p-2">
              see availability
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
