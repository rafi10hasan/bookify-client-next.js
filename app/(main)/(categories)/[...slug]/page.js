import { auth } from "@/auth.config";
import Filter from "@/components/Filter/Filter";
import { FilterMobileCourse } from "@/components/Filter/FilterMobileCourse";
import PaginationCom from "@/components/pagination/Pagination";
import NoRooms from "@/components/Rooms/no-rooms";
import RoomList from "@/components/Rooms/RoomList";
import { notFound, redirect } from "next/navigation";

export default async function singleRoomPage({ params, searchParams }) {
  const session = await auth();
  if(!session){
    redirect('/login')
  }
  const { page,limit,sort, view, grading, minPrice, maxPrice } = await searchParams;
  const {slug} = await params
  const id = slug[1];
  const queryString = new URLSearchParams({

    page: page || 1,
    limit: limit || 5,
    sort: sort || "",
    view: view || "", 
    grading: grading || "",
    minPrice: minPrice?.toString() || "", 
    maxPrice: maxPrice?.toString() || "",

  }).toString();

  const response = await fetch(`http://localhost:5000/rooms/all/${id}?${queryString}`, {
    method:"GET",
    headers:{
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json'
    },
    cache: "no-store",
  });
  const fetchedRoom = await response.json();
  if(!fetchedRoom){
    notFound()
  }
  const {minimumPrice,maximumPrice,totalCounts,updatedRooms} = fetchedRoom
  
  return (
    <>
      <div className="py-12 space-y-4">
        <div className="w-[90vw] md:w-[86vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[68vw] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:hidden mb-4">
            <FilterMobileCourse max_price={maximumPrice} min_price={minimumPrice}/>
          </div>
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <Filter max_price={maximumPrice} min_price={minimumPrice}/>
          </div>

          <div className="col-span-9 space-y-4">
            {updatedRooms.length > 0 ? <RoomList fromSearchPage={false} rooms={updatedRooms}/> : <NoRooms></NoRooms>}
          </div>
        </div>
        <PaginationCom items={totalCounts}/>
      </div>
    </>
  );
}
