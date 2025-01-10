'use client'
import { Badge } from "@/components/ui/badge";
import { createColumnHelper } from "@tanstack/react-table";
import { MailIcon, PenIcon, ShieldPlus, SquarePen, Trash, Trash2, User, UserCircle, UserCircle2 } from "lucide-react";

const columnsHelper = createColumnHelper();

const createCategoryColumns = ({onEdit,onDelete}) => [
   

    columnsHelper.accessor('title',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <User className="mr-2" size={16}/>CATEGORY NAME
            </span>
        )
    }),

    columnsHelper.display({
        id: 'edit',
        header: () => (
            <span className="flex items-center">
                <SquarePen className="mr-2" size={16} /> EDIT
            </span>
        ),
        cell: ({ row }) => (
            <button
                onClick={() => onDelete(row.original._id)}
                className="flex items-center bg-deep-cyan text-white px-2 py-1 rounded hover:bg-red-700"
            >
                <PenIcon className="mr-1" size={16} />
                EDIT
            </button>
        ),
        enableSortingRemoval: false
    }),
  
    columnsHelper.display({
        id: 'delete',
        header: () => (
            <span className="flex items-center">
                <Trash className="mr-2" size={16} />DELETE
            </span>
        ),
        cell: ({ row }) => (
            <button
                onClick={() => onEdit(row.original._id)}
                className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
                <Trash className="mr-1" size={16} />
                DELETE
            </button>
        ),
        enableSortingRemoval: false
    }),
    
] 


export default createCategoryColumns