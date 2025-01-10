'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { BedDouble, BedSingle, DollarSign, MailIcon, ShieldPlus, Square, SquarePen, Trash2, User, UserCircle, UserCircle2 } from "lucide-react";


const columnsHelper = createColumnHelper();

/*

title,
room-type
max-occupancy
price
size

*/

const accommodationColumn = ({onEdit}) => [
   


    columnsHelper.accessor('serial no', {
        cell: (info) => {
          // Use `row.index` for serial number
          const rowIndex = info.row.index + 1; // Adding 1 to make it 1-based instead of 0-based
          return rowIndex;
        },
        header: () => (
          <span className="flex items-center">
            <User className="mr-2" size={16} />
            Serial No
          </span>
        ),
      }),

    columnsHelper.accessor('title',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <BedSingle className="mr-2" size={16}/> Room Name
            </span>
        )
    }),

    columnsHelper.accessor('size',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <Square className="mr-2" size={16}/>Size
            </span>
        )
    }),
    
    columnsHelper.accessor('totalRooms',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <BedDouble className="mr-2" size={16}/>Total Room
            </span>
        )
    }),

    columnsHelper.accessor('max_occupancy',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <User className="mr-2" size={16}/>Guest
            </span>
        )
    }),

    columnsHelper.accessor('price',{
        cell: (info)=> {
           const price = info.getValue('price')
           return `${price}$`
        },

        header: ()=>(
            <span className="flex items-center">
                 <DollarSign className="mr-2" size={16}/>price
            </span>
        )
    }),


    columnsHelper.display({
        id: 'actions',
        header: () => (
            <span className="flex items-center">
                <SquarePen className="mr-2" size={16} /> ACTION
            </span>
        ),
        cell: ({ row }) => (
            <Button
                variant = "yellow"
                onClick ={() => onEdit(row.original._id)}
                
            >
                <SquarePen className="mr-1" size={16} />
                Edit
            </Button>
        ),
        enableSortingRemoval: false
    }),

    
] 


export default accommodationColumn