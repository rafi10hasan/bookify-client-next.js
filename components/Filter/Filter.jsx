import React, {} from "react";
import { Separator } from "../ui/separator";
import FilterByPriceRange from "./FilterByPriceRange";
import SortByGrading from "./sortByGrading";
import SortByPrice from "./SortByPrice";
import SortByView from "./SortByView";

 function Filter({max_price,min_price}) {
  return (
    <div className="shadow-md w-11/12 h-auto bg-white rounded-md px-3 py-4">
      
        <SortByPrice/>
        <Separator className="mt-2"/>
        <FilterByPriceRange maxPrice ={max_price} minPrice={min_price} />
        <Separator className="mt-2"/>
        <SortByView />
        <Separator className="mt-2"/>
        <SortByGrading/>
    </div>
  );
}
export default Filter