"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const SortByView = () => {
  const [searchText, setSearchText] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  // Memoize handleChange function to prevent re-creation on every render
  const handleChange = (name,checked) => {
    if (checked) {
      params.set("page", 1);
      params.set("limit", 5);
      setSearchText((prev) => [...prev, name]);
    } else {
      const filtered = searchText.filter((search) => search !== name);
      setSearchText(filtered);
    }
  };
  useEffect(() => {
    const view = params.get("view");
    if (view) {
      const decodedView = decodeURI(view);
      const queryInView = decodedView.split("|");
      setSearchText(queryInView);
    }
  }, []);

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);

  //   if (searchText.length > 0) {
  //     params.set('view', encodeURI(searchText.join('|')));
  //   } else {
  //     params.delete('view');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, [searchText, pathname, replace, searchParams]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    // Set or remove parameters based on searchText
    if (searchText.length > 0) {
      newParams.set("view", encodeURI(searchText.join("|")));
    } else {
      newParams.delete("view");
    }

    // Only update if the params are different
    if (params.toString() !== newParams.toString()) {
      replace(`${pathname}?${newParams.toString()}`);
    }
  }, [searchText, pathname, replace]);

  return (
    <div>
      <h3 className="font-bold text-lg text-deep-cyan">View</h3>
      <form action="" className="flex flex-col gap-3 mt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="swimmingPool"
            name="swimming pool"
            onCheckedChange={(checked) => handleChange("swimming pool", checked)}
            checked={searchText.includes("swimming pool")}
          />
          <label
            htmlFor="swimmingPool"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            swimming pool
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="beach"
            name="beach"
            onCheckedChange={(checked) => handleChange("beach", checked)}
            checked={searchText.includes("beach")}
          />
          <label
            htmlFor="beach"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            beach
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="beachAndOcean"
            name="beach&ocean"
            onCheckedChange={(checked) => handleChange("beach&ocean", checked)}
            checked={searchText.includes("beach&ocean")}
          />
          <label
            htmlFor="beachAndOcean"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            beach & ocean
          </label>
        </div>
      </form>
    </div>
  );
};

export default SortByView;
