'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {  useState } from "react";

const SortByPrice = () => {
    const [selectedSort,setSelectedSort] = useState('lowToHigh');
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const {replace} = useRouter();
    
    function handleChange(value){
        setSelectedSort(value);
        const params = new URLSearchParams(searchParams) ;
        params.set('sort',value);
        params.set('page',1);
        params.set('limit',5)
        replace(`${pathName}?${params.toString()}`);
       
    }
    return (
        <div>
            <h3 className="font-bold text-lg text-deep-cyan">Sort By</h3>
            <form action="" className="flex flex-col gap-2 mt-2">
                <label htmlFor="highToLow">
                    <input type="radio"
                     onChange={()=>handleChange('highToLow')}
                     name="highToLow"
                     id="highToLow"
                     checked = {selectedSort === 'highToLow'}
                     />
                    
                     {' '}Price High to Low
                </label>

                <label htmlFor="lowToHigh">
                    <input 
                    type="radio"
                    onChange={()=>handleChange('lowToHigh')}
                    name="lowToHigh"
                    id="lowToHigh" 
                    checked = {selectedSort === 'lowToHigh'}
                    />
                    
                    {' '}Price Low to high
                </label>
            </form>
        </div>
    );
};

export default SortByPrice;
