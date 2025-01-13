import { auth } from "@/auth.config";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export default async function myBooking() {
  const session = await auth();
  if(!session){
    redirect('/login')
  }
  let bookingsData;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/mybookings/${session.id}`);
    bookingsData = await response.json();
    if (bookingsData.length === 0) {
      return <CardContent className="p-2">There are no bookings found for this user</CardContent>;
    }
  } catch (error) {
    throw new Error(error)
  }

    return (
      <div className="px-4 py-2">
      <h1 className="text-xl text-deep-cyan font-semibold mb-2">Your Bookings...</h1>
      <div className="rounded-md border-1 bg-gray-50">
        <Table className="w-full text-center font-medium border-collapse">
          <TableHeader >
            <TableRow>
              <TableHead className="border text-center font-semibold">Room Name</TableHead>
              <TableHead className="border text-center font-semibold">Booking Date</TableHead>
              <TableHead className="border text-center font-semibold">End Date</TableHead>
              <TableHead className="border text-center font-semibold">Booked Room</TableHead>
              <TableHead className="border text-center font-semibold">Booking Price</TableHead>
              <TableHead className="border text-center font-semibold">Payement Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsData.length && (
              bookingsData.map((bookings)=>(
                  <TableRow className="text-center font-semibold" key={bookings._id}>
                <TableCell className="border">{bookings.roomName}</TableCell>
                <TableCell className="border">{format(bookings.checkin,"PPP")}</TableCell>
                <TableCell className="border">{format(bookings.checkout,"PPP")}</TableCell>
                <TableCell className="border">{bookings.bookedRoom}</TableCell>
                <TableCell className="border">{bookings.bookingPrice}$</TableCell>
                <TableCell className="border"><Badge className="h-8 w-12 rounded-sm bg-deep-cyan">{bookings.paymentStatus}</Badge></TableCell>
              </TableRow>
              ))
             
            )}
          </TableBody>
        </Table>
      </div>
      </div>
    );
  
 
}
