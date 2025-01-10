"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export default function PaginationCom({items}) {
  const defaultItemsPerPage = 5;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || defaultItemsPerPage;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(initialLimit);
  const totalPages = Math.ceil(items / totalItems); // Ensure count is number
 

  function updateSearchParams(page, itemsPerPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    params.set("limit", itemsPerPage);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleChangeItemsPerPage(val) {
    const newItemsPerPage = Number(val);
    setTotalItems(newItemsPerPage);
    setCurrentPage(1); // Reset to first page on limit change
    updateSearchParams(1, newItemsPerPage);
  }

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  const pageRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  function handlePageChange(page) {
    setCurrentPage(page);
    updateSearchParams(page, totalItems);
  }

  function handleNext() {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  }

  function handlePrevious() {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  }

  useEffect(()=>{
   const params = new URLSearchParams(searchParams);
   const page = Number(params.get('page'));
   setCurrentPage(page)
  },[searchParams])

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                } hover:bg-transparent`}
              />
            </PaginationItem>

            {pageRange.map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page===currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                } hover:bg-transparent`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="mt-10">
        <Select onValueChange={handleChangeItemsPerPage} className="w-44" defaultValue={String(totalItems)}>
          <SelectTrigger>
            <SelectValue>{totalItems} per page</SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
