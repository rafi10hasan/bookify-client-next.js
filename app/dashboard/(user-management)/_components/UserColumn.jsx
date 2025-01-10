'use client'
import { Badge } from "@/components/ui/badge";
import { createColumnHelper } from "@tanstack/react-table";
import { MailIcon, ShieldPlus, SquarePen, Trash2, User, UserCircle, UserCircle2 } from "lucide-react";
import Image from "next/image";

const columnsHelper = createColumnHelper();

const createColumns = ({onMakeAdmin,onDelete}) => [
   
    columnsHelper.accessor('image',{
        cell: (info) => {
            const imageUrl = info.getValue(); // Get the image URL from the data
            return (
              <div className="">
                {
                    imageUrl ?  (<Image
                    src={imageUrl}
                    alt="Profile"
                    width={10}
                    height={10}
                    className="w-10 h-10 rounded-full object-cover"
                  />): <User className="w-10 h-10"/>
                }
               
              </div>
            );
          },
        header: ()=>(
            <span className="flex items-center">
                 <UserCircle2 className="mr-2" size={16}/>PROFILE
            </span>
        )
    }),


    columnsHelper.accessor('firstname',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <User className="mr-2" size={16}/>FIRSTNAME
            </span>
        )
    }),

    columnsHelper.accessor('lastname',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <User className="mr-2" size={16}/>LASTNAME
            </span>
        )
    }),

    columnsHelper.accessor('email',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <MailIcon className="mr-2" size={16}/>EMAIL
            </span>
        )
    }),

    columnsHelper.accessor('role',{
        cell: (info) => {
            const role = info.getValue();
      
            // Define badge variants for roles
            const badgeVariants = {
              admin: "admin",
              user: "user",      
            };
      
            return (
              <Badge variant={badgeVariants[role] || "default"}>
                {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize role */}
              </Badge>
            );
          },
        header: ()=>(
            <span className="flex items-center">
                 <UserCircle className="mr-2" size={16}/>ROLE
            </span>
        )
    }),

    columnsHelper.display({
        id: "admin",
        header: () => (
          <span className="flex items-center">
            <UserCircle className="mr-2" size={16} /> ADMIN
          </span>
        ),
        cell: ({ row }) => {
          const { role, _id } = row.original; // Get the role and ID from the row
          const isAdmin = role === "admin"; // Check if the user is already an admin
      
          return (
            <button
              onClick={() => !isAdmin && onMakeAdmin(_id)} // Call the function only if not already an admin
              className={`flex items-center px-2 py-1 rounded ${
                isAdmin
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled styling
                  : "bg-deep-yellow text-white hover:bg-deep-cyan" // Active styling
              }`}
              disabled={isAdmin} // Disable the button if the user is already an admin
            >
              <ShieldPlus className="mr-1" size={16} />
              {isAdmin ? "Already Admin" : "Make Admin"} {/* Update button text */}
            </button>
          );
        },
        enableSortingRemoval: false,
      }),

    columnsHelper.display({
        id: 'actions',
        header: () => (
            <span className="flex items-center">
                <SquarePen className="mr-2" size={16} /> ACTION
            </span>
        ),
        cell: ({ row }) => (
            <button
                onClick={() => onDelete(row.original._id)}
                className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
                <Trash2 className="mr-1" size={16} />
                Delete
            </button>
        ),
        enableSortingRemoval: false
    }),

    
] 


export default createColumns