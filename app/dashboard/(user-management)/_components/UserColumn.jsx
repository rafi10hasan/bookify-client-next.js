"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  ShieldCheck,
  ShieldPlus,
  Trash2,
  User,
  UserCircle2,
  SquarePen,
} from "lucide-react";

const columnsHelper = createColumnHelper();

const createColumns = ({ onMakeAdmin, onDelete }) => [
  columnsHelper.accessor("image", {
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <UserCircle2 className="w-4 h-4" /> Profile
      </span>
    ),
    cell: (info) => {
      const imageUrl = info.getValue();
      return (
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-gray-400" />
          )}
        </div>
      );
    },
  }),

  columnsHelper.accessor("firstname", {
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <User className="w-4 h-4" /> First Name
      </span>
    ),
    cell: (info) => <span className="font-medium text-gray-800 capitalize">{info.getValue() || "-"}</span>,
  }),

  columnsHelper.accessor("lastname", {
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <User className="w-4 h-4" /> Last Name
      </span>
    ),
    cell: (info) => <span className="font-medium text-gray-800 capitalize">{info.getValue() || "-"}</span>,
  }),

  columnsHelper.accessor("email", {
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <MailIcon className="w-4 h-4" /> Email
      </span>
    ),
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),

  columnsHelper.accessor("role", {
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4" /> Role
      </span>
    ),
    cell: (info) => {
      const role = info.getValue()?.toLowerCase();
      const isAdmin = role === "admin";
      return (
        <Badge
          className={`px-2.5 py-0.5 capitalize font-semibold shadow-none ${
            isAdmin
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
              : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
          }`}
          variant="outline"
        >
          {role || "user"}
        </Badge>
      );
    },
  }),

  columnsHelper.display({
    id: "admin",
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <ShieldPlus className="w-4 h-4" /> Admin Action
      </span>
    ),
    cell: ({ row }) => {
      const { role, _id } = row.original;
      const isAdmin = role === "admin";

      return (
        <Button
          size="sm"
          variant={isAdmin ? "ghost" : "outline"}
          onClick={() => !isAdmin && onMakeAdmin(_id)}
          disabled={isAdmin}
          className={`h-8 gap-1.5 text-xs font-medium ${
            isAdmin
              ? "text-gray-400 bg-gray-50 border-transparent cursor-not-allowed"
              : "text-amber-600 border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          }`}
        >
          <ShieldPlus className="w-3.5 h-3.5" />
          {isAdmin ? "Already Admin" : "Make Admin"}
        </Button>
      );
    },
  }),

  columnsHelper.display({
    id: "actions",
    header: () => (
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <SquarePen className="w-4 h-4" /> Actions
      </span>
    ),
    cell: ({ row }) => {
      const { role, _id } = row.original;
      const isAdmin = role === "admin";

      return (
        <Button
          size="sm"
          variant="destructive"
          disabled={isAdmin}
          onClick={() => !isAdmin && onDelete(_id)}
          className={`h-8 gap-1.5 text-xs font-medium shadow-none transition-colors ${
            isAdmin
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-100 hover:text-gray-400"
              : "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </Button>
      );
    },
  }),
];

export default createColumns;