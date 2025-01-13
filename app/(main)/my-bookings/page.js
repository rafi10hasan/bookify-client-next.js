import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PastBokings from "./_components/PastBokings";
import UpcomingBooking from "./_components/UpcomingBooking";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
export default async function MyBookingsPage() {
    const session = await auth();
    if(!session){
      redirect('/login')
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/history/${session?.id}`);
      const data = await response.json();
      console.log(data)
    return (
      <div>
        <h1 className="text-2xl text-center text-deep-yellow font-semibold mt-20 mb-10">
          My Bookings
        </h1>
        <div className="w-[90vw] lg:w-[72vw] mx-auto mb-10">
          <Tabs defaultValue="past booking" className="">
            <TabsList className="grid grid-cols-2 h-12">
              <TabsTrigger className="text-lg" value="past booking">Past Booking</TabsTrigger>
              <TabsTrigger className="text-lg" value="upcoming book">Upcoming Booking</TabsTrigger>
            </TabsList>
            <TabsContent value="past booking">
              <PastBokings pastBookings = {data.pastBookings}/>
            </TabsContent>
  
            <TabsContent value="upcoming book">
              <UpcomingBooking upcomingBookings ={data.upcomingBookings}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
    } catch (error) {
      throw new Error(error)
    }
   
}
