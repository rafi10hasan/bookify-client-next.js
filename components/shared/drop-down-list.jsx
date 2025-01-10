"use client";
import { cn } from "@/lib/utils";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function DropDownList({ onDropClose, categories }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleSelect = (category) => {
    setOpen(false);
    router.push(`/${category.title}/${category._id}?page=1&limit=5`); // Close the dropdown after an item is clicked
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Link href="" className="flex items-center">
            rooms <ArrowDown className="size-4 mt-[2px]" />
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn(
            " absolute z-10 top-4 w-[130px] backdrop-blur border-0 bg-deep-cyan rounded-sm text-white p-2"
          )}
        >
          {categories.length &&
            categories.map((category) => (
              <DropdownMenuItem
                key={category._id}
                className="cursor-pointer hover:bg-light-yellow hover:text-black px-1 py-1 rounded-sm"
                onClick={onDropClose}
                onSelect={() => handleSelect(category)}
              >
                {/* <Link href={`/${category.title}/${category._id}`}>{category.title}</Link> */}
                {category.title}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
