
import { auth } from "@/auth.config";
import Filter from "@/components/Filter/Filter";
import { FilterMobileCourse } from "@/components/Filter/FilterMobileCourse";
import PaginationCom from "@/components/pagination/Pagination";
import NoRooms from "@/components/Rooms/no-rooms";
import RoomList from "@/components/Rooms/RoomList";
import { notFound, redirect } from "next/navigation";

export default async function singleRoomPage({ params, searchParams }) {
  let fetchedRoom;
  try {
    // Authenticate the user
    const session = await auth();
    if (!session) {
      redirect('/login');
    }

    // Extract parameters and build the query string
    const { page, limit, sort, view, grading, minPrice, maxPrice } = searchParams;
    const { slug } = await params;
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

    // Fetch room data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/all/${id}?${queryString}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    fetchedRoom = await response.json();
    if (!fetchedRoom) {
      notFound();
    }
  } catch (error) {
    throw new Error(error)
   }
    // Destructure the fetched data
    const { minimumPrice, maximumPrice, totalCounts, updatedRooms } = fetchedRoom;

    // Return the rendered UI
    return (
      <>
        <div className="py-12 space-y-4">
          <div className="w-[90vw] md:w-[86vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[68vw] mx-auto grid grid-cols-1 lg:grid-cols-12">
            {/* Mobile Filter */}
            <div className="lg:hidden mb-4">
              <FilterMobileCourse max_price={maximumPrice} min_price={minimumPrice} />
            </div>

            {/* Desktop Filter */}
            <div className="hidden lg:block lg:col-span-3 space-y-4">
              <Filter max_price={maximumPrice} min_price={minimumPrice} />
            </div>

            {/* Room List */}
            <div className="col-span-9 space-y-4">
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
      </>
    );
 
}
