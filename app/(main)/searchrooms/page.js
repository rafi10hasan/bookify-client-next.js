import Filter from "@/components/Filter/Filter";
import { FilterMobileCourse } from "@/components/Filter/FilterMobileCourse";
import Reservation from "@/components/Home/Reservation";
import PaginationCom from "@/components/pagination/Pagination";
import NoRooms from "@/components/Rooms/no-rooms";
import RoomList from "@/components/Rooms/RoomList";

export default async function SearchRooms({ searchParams }) {
  const { checkin, checkout, adults, children ,sort , minPrice ,maxPrice,view, page,limit, grading } = await searchParams;
  const queryString = new URLSearchParams({
    checkin,
    checkout,
    adults,
    children,
    sort: sort || "",
    view: view || "",
    page: page || 1,
    limit: limit || 5, 
    grading: grading || "",
    minPrice: minPrice?.toString() || "", 
    maxPrice: maxPrice?.toString() || "",

  }).toString();
   try {
    const response = await fetch(`http://localhost:5000/searchrooms?${queryString}`, {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      },
      cache: "no-store",
    });
    const fetchedRooms = await response.json();
    const {totalCounts,searchResultRooms:rooms,maximumPrice,minimumPrice} = fetchedRooms
  
    return (
      <div className="bg-[#fffff1">
        <div>
          <Reservation modify={true} />
        </div>
  
        <div className="py-10 space-y-4">
          <div className="w-[90vw] md:w-[86vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[68vw] mx-auto grid grid-cols-1 lg:grid-cols-12">
            <div className="flex justify-center lg:hidden mb-4">
              <FilterMobileCourse max_price={maximumPrice} min_price={minimumPrice}/>
            </div>
            <div className="hidden lg:block lg:col-span-3 space-y-4">
              <Filter max_price={maximumPrice} min_price={minimumPrice}/>
            </div>
  
            <div className="col-span-9 space-y-4">
              {rooms.length > 0 ? (
                <RoomList fromSearchPage={true} rooms={rooms} checkin={checkin} checkout={checkout} />
              ) : (
                <NoRooms></NoRooms>
              )}
            </div> 
          </div>
            <div>
            <PaginationCom items={totalCounts}/>
            </div>
        </div>
      </div>
    );
   } catch (error) {
      throw new Error(error)
   }

}
