import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PastBookings from "./_components/PastBokings";
import UpcomingBooking from "./_components/UpcomingBooking";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function MyBookingsPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/history/${session?.id}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return (
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>
          <p className="text-sm text-slate-500">
            View and manage all your past and upcoming room reservations.
          </p>
        </div>

        {/* Tabs & Content */}
        <div className="w-full">
          <Tabs defaultValue="upcoming" className="w-full space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 p-1 bg-slate-100 rounded-xl">
              <TabsTrigger
                value="past"
                className="text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all"
              >
                Past Bookings
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all"
              >
                Upcoming Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="past" className="focus-visible:outline-none">
              <PastBookings pastBookings={data?.pastBookings || []} />
            </TabsContent>

            <TabsContent value="upcoming" className="focus-visible:outline-none">
              <UpcomingBooking upcomingBookings={data?.upcomingBookings || []} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    throw new Error(error.message || "Failed to load bookings");
  }
}