"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Bed,
  DollarSign,
  EyeIcon,
  FullscreenIcon,
  GrabIcon,
  List,
  MailIcon,
  Notebook,
  PenIcon,
  ShieldEllipsis,
  SquarePen,
  Star,
  Trash2,
  User,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columnsHelper = createColumnHelper();

const createRoomColumns = ({ onDelete }) => [
  columnsHelper.accessor("serial no", {
    cell: (info) => {
      // Use `row.index` for serial number
      const rowIndex = info.row.index + 1; // Adding 1 to make it 1-based instead of 0-based
      return rowIndex;
    },
    header: () => (
      <span className="flex items-center">
        <List className="mr-2" size={16} />
        SI
      </span>
    ),
  }),
  
  columnsHelper.display({
    id: "actions",
    header: () => (
      <span className="flex justify-center items-center">
        <SquarePen className="mr-2" size={16} /> ACTION
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Button
          variant="yellow"
        >
         <Link className="flex gap-1" href={`edit-room/${row.original._id}`}><PenIcon className="mr-1" size={16} />Edit</Link> 
          
        </Button>

        <Button
          onClick={() => onDelete(row.original._id)}
          variant="destructive"
        >
          <Trash2 className="mr-1" size={18} />
          Delete
        </Button>
      </div>
    ),
    enableSortingRemoval: false,
  }),

  columnsHelper.accessor("image", {
    cell: (info) => {
      const imageUrl = info.getValue(); // Get the image URL from the data
      return (
        <div className="">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="room"
              height={100}
              width={100}
              className="rounded-sm object-cover"
            />
          ) : (
            <User className="w-10 h-10" />
          )}
        </div>
      );
    },
    header: () => (
      <span className="flex items-center">
        <UserCircle2 className="mr-2" size={16} />
        PROFILE
      </span>
    ),
  }),

  columnsHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Notebook className="mr-2" size={16} />
        Title
      </span>
    ),
  }),

  columnsHelper.accessor("view", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <EyeIcon className="mr-2" size={16} />
        View
      </span>
    ),
  }),

  columnsHelper.accessor("size", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <FullscreenIcon className="mr-2" size={16} />
        Size
      </span>
    ),
  }),

  columnsHelper.accessor("bed_type", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Bed className="mr-2" size={16} />
        Bed Type
      </span>
    ),
  }),

  columnsHelper.accessor("max_occupancy", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} />
        Guest
      </span>
    ),
  }),

  columnsHelper.accessor("price", {
    cell: (info) => {
      const price = info.getValue("price");
      return `${price}$`;
    },

    header: () => (
      <span className="flex items-center">
        <DollarSign className="mr-2" size={16} />
        price
      </span>
    ),
  }),

  columnsHelper.accessor("grading", {
    cell: (info) => {
        const grading = info.getValue();
  
        // Define badge variants for roles
        const badgeVariants = {
          superb: "superb",
          "very good": "very good",
          good: "good",
          average: "average",
          poor: "poor"      
        };
  
        return (
          <Badge variant={badgeVariants[grading] || "default"}>
             {grading}
          </Badge>
        );
      },
    header: () => (
      <span className="flex items-center">
        <ShieldEllipsis  className="mr-2" size={16} />
       <Badge>Grading</Badge> 
      </span>
    ),
  }),

  columnsHelper.accessor("average_rating", {
    cell: (info) => {
      const rating = info.getValue("avg_rating");
      return (
        <div className="flex items-center gap-2">
          <Star fill="orange" />
          {rating}
        </div>
      );
    },
    header: () => (
      <span className="flex items-center">
        <Star fill="orange" className="mr-2 border-orange-500" size={16} />
        Rating
      </span>
    ),
  }),

  
];

export default createRoomColumns;
