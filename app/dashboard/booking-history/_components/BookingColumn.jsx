"use client";
import { Badge } from "@/components/ui/badge";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Bed,
  DollarSign,
  DollarSignIcon,
  FullscreenIcon,
  List,
  Mail,
  PhoneCallIcon,
  User,
  
} from "lucide-react";


const columnsHelper = createColumnHelper();

const bookingColumns = () => [
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
  

  columnsHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} />
        Name
      </span>
    ),
  }),

  columnsHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Mail className="mr-2" size={16} />
        email
      </span>
    ),
  }),

  columnsHelper.accessor("phone", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <PhoneCallIcon className="mr-2" size={16} />
        phone
      </span>
    ),
  }),

  columnsHelper.accessor("checkin", {
    cell: (info) => {
      const date = info.getValue();
      const formatDate = format(new Date(date), "MM-dd-yyyy");
      return formatDate;
    },
    header: () => (
      <span className="flex items-center">
        <FullscreenIcon className="mr-2" size={16} />
        Check-in
      </span>
    ),
  
  }),

  columnsHelper.accessor("checkout", {
    cell: (info) => {
        const date = info.getValue();
        const formatDate = format(new Date(date), "MM-dd-yyyy");
        return formatDate;
      },
      header: () => (
        <span className="flex items-center">
          <FullscreenIcon className="mr-2" size={16} />
          Check-out
        </span>
      ),
    
  }),


  columnsHelper.accessor("roomName", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Bed className="mr-2" size={16} />
        room name
      </span>
    ),
  }),

  columnsHelper.accessor("bookedRoom", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} />
        bookedRoom
      </span>
    ),
  }),

  columnsHelper.accessor("bookingPrice", {
    cell: (info) => {
      const price = info.getValue("price");
      return `${price}$`;
    },

    header: () => (
      <span className="flex items-center">
        <DollarSign className="mr-2" size={16} />
        booking price
      </span>
    ),
  }),
  
 
  columnsHelper.accessor("paymentStatus", {
    cell: (info) => {
        const status = info.getValue();
        return (
            <Badge variant="default">
               {status}
            </Badge>
          );
    } ,
    header: () => (
      <span className="flex items-center">
        <DollarSignIcon className="mr-2" size={16} />
        paymentStatus
      </span>
    ),
  }),

  
  
];

export default bookingColumns
