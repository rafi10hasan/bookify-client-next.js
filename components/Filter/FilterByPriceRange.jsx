'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const FilterByPriceRange = ({maxPrice,minPrice}) => {
 // Default range
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [range, setRange] = useState({ min: minPrice, max: maxPrice });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  
  const updateQueryParams = useCallback(
    debounce((newMin, newMax) => {
      const params = new URLSearchParams(searchParams);
      params.set('minPrice', newMin);
      params.set('maxPrice', newMax);
      params.set('page',1),
      params.set('limit',5)
      replace(`${pathname}?${params.toString()}`);
    }, 1500), // 500ms delay
    [replace, pathname, searchParams]
  );

  useEffect(() => {
    setRange({ min: minPrice, max: maxPrice });
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    const value = Math.min(parseInt(e.target.value), maxValue - 1); // Ensure minValue < maxValue
    setMinValue(value);
    updateQueryParams(value, maxValue);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(parseInt(e.target.value), minValue + 1); // Ensure maxValue > minValue
    setMaxValue(value);
    updateQueryParams(minValue, value);
  };

  return (
    <div>
      <h3 className="text-lg text-deep-cyan font-bold mb-4">Price Range</h3>

      {/* Min Price Range */}
      <label htmlFor="min-range" className="block mb-2 font-medium">Min Price:</label>
      <input
        id="min-range"
        type="range"
        step={1}
        min={range.min} // Use static boundaries
        max={range.max} // Use static boundaries
        value={minValue} // Bind value to slider state
        onChange={handleMinChange}
        className="w-full accent-midnight"
      />
      <p className="bg-slate-50 p-2 shadow-md w-full mb-4 text-midnight font-semibold">Selected Min Price: <span className="text-deep-cyan">{minValue}$</span></p>

      {/* Max Price Range */}
      <label htmlFor="max-range" className="block mb-2 font-medium">Max Price:</label>
      <input
        id="max-range"
        type="range"
        step={1}
        min={range.min} // Use static boundaries
        max={range.max} // Use static boundaries
        value={maxValue} // Bind value to slider state
        onChange={handleMaxChange}
        className="w-full  accent-midnight"
      />
      <p className="bg-slate-50 p-2 shadow-md w-full mb-4 text-midnight font-semibold">Selected Max Price: <span className="text-deep-cyan">{maxValue}$</span></p>

    </div>
  );
};

export default FilterByPriceRange;
