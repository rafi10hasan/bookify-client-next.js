'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

const SortByGrading = () => {
  const [searchText,setSearchText] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const params = new URLSearchParams(searchParams);
  function handleChange(name,checked){

    if(checked){
      
      params.set('page',1);
      params.set('limit',5);
      setSearchText((prev)=>[...prev,name])
    }
    else{
      const filtered = searchText.filter((search)=>search!==name);
      setSearchText(filtered)
    }
  }
  
  useEffect(() => {
 
    const view = params.get('grading');
    if (view) {
      const decodedView = decodeURI(view);
      const queryInView = decodedView.split('|');
      setSearchText(queryInView);
    }

  }, []);

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);

  //   if (searchText.length > 0) {
  //     params.set('grading', encodeURI(searchText.join('|')))
  //   } else {
  //     params.delete('grading');
  //   }
  //   replace(`${pathname}?${params.toString()}`)
  // }, [searchText,pathname,replace,searchParams])

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    // Set or remove parameters based on searchText
    if (searchText.length > 0) {
      newParams.set('grading', encodeURI(searchText.join('|')));
    } else {
      newParams.delete('grading');
    }
  
    // Only update if the params are different
    if (params.toString() !== newParams.toString()) {
      replace(`${pathname}?${newParams.toString()}`);
    }
  }, [searchText, pathname, replace]);

  
    return (
      <div>
      <h3 className="font-bold text-lg text-deep-cyan">grading</h3>
      <form action="" className="flex flex-col gap-3 mt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="superb"
            onCheckedChange={(checked) => handleChange("superb", checked)}
            checked={searchText.includes("superb")}
          />
          <label
            htmlFor="superb"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            superb
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="very good"
            onCheckedChange={(checked) => handleChange("very good", checked)}
            checked={searchText.includes("very good")}
          />
          <label
            htmlFor="very good"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            very good
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="good"
            onCheckedChange={(checked) => handleChange("good", checked)}
            checked={searchText.includes("good")}
          />
          <label
            htmlFor="good"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            good
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="average"
            onCheckedChange={(checked) => handleChange("average", checked)}
            checked={searchText.includes("average")}
          />
          <label
            htmlFor="average"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            average
          </label>
        </div>


        <div className="flex items-center space-x-2">
          <Checkbox
            id="poor"
            onCheckedChange={(checked) => handleChange("poor", checked)}
            checked={searchText.includes("poor")}
          />
          <label
            htmlFor="poor"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            poor
          </label>
        </div>

      </form>
    </div>
    );
  };
  
  export default SortByGrading;
  