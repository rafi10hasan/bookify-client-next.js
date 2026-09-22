import { auth } from "@/auth.config";
import Filter from "@/components/Filter/Filter";
import { FilterMobileCourse } from "@/components/Filter/FilterMobileCourse";
import PaginationCom from "@/components/pagination/Pagination";
import NoRooms from "@/components/Rooms/no-rooms";
import RoomList from "@/components/Rooms/RoomList";
import { notFound, redirect } from "next/navigation";

export default async function singleRoomPage({ params, searchParams }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { slug } = resolvedParams || {};

 
  const id = slug?.[1] || slug?.[0];


  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (!id || !isValidObjectId) {
    notFound();
  }


  const { page, limit, sort, view, grading, minPrice, maxPrice } = resolvedSearchParams || {};

  const queryParams = new URLSearchParams();
  queryParams.set("page", page || "1");
  queryParams.set("limit", limit || "5");

  if (sort) queryParams.set("sort", sort);
  if (view) queryParams.set("view", view);
  if (grading) queryParams.set("grading", grading);
  if (minPrice) queryParams.set("minPrice", String(minPrice));
  if (maxPrice) queryParams.set("maxPrice", String(maxPrice));

  let fetchedRoom;

  try {
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/all/${id}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken || ""}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    fetchedRoom = await response.json();
    console.log(fetchedRoom)
    if (!fetchedRoom) {
      notFound();
    }
  } catch (error) {
    console.error("Room fetch error:", error.message);
    throw new Error(error.message || "Failed to load room data");
  }

  
  const {
    minimumPrice = 0,
    maximumPrice = 0,
    totalCounts = 0,
    updatedRooms = [],
  } = fetchedRoom;


  return (
    <div className="py-12 space-y-4">
      <div className="w-[90vw] md:w-[86vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[68vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mobile Filter */}
        <div className="lg:hidden mb-4">
          <FilterMobileCourse max_price={maximumPrice} min_price={minimumPrice} />
        </div>

        {/* Desktop Filter */}
        <div className="hidden lg:block lg:col-span-3 space-y-4">
          <Filter max_price={maximumPrice} min_price={minimumPrice} />
        </div>

        {/* Room List */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {updatedRooms.length > 0 ? (
            <RoomList fromSearchPage={false} rooms={updatedRooms} />
          ) : (
            <NoRooms />
          )}
        </div>
      </div>

      {/* Pagination */}
      <PaginationCom items={totalCounts} />
    </div>
  );
}