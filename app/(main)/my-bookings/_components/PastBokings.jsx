import { auth } from "@/auth.config";
import { Badge } from "@/components/ui/badge";
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
export default async function PastBokings ({pastBookings}) {
  const session = await auth();
        if(!session){
          redirect('/login')
        }
  return (
    <>
    {
      pastBookings.length ? (

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
          {pastBookings.length && (
            pastBookings.map((bookings)=>(
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
      ): <p>there are no past bookings</p>
    }
      
 
    </>
  );
}
