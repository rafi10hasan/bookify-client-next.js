import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import FilterByPriceRange from "./FilterByPriceRange";
import SortByPrice from "./SortByPrice";
import SortByView from "./SortByView";
import SortByGrading from "./sortByGrading";

export function FilterMobileCourse({ max_price, min_price }) {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <FilterIcon />
        </SheetTrigger>
        <SheetContent className="block lg:hidden">
          <SheetHeader>
            <SheetTitle>Filter your room</SheetTitle>
            <SheetDescription>search your needed criteria</SheetDescription>
          </SheetHeader>

          <SortByPrice />
          <FilterByPriceRange maxPrice={max_price} minPrice={min_price} />
          <SortByView />
          <SortByGrading />
        </SheetContent>
      </Sheet>
    </div>
  );
}
