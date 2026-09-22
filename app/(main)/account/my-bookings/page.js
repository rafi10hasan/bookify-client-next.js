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

export default async function MyBooking() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  let bookingsData = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/mybookings/${session.id}`);
    bookingsData = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Your Bookings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage and view all your active room reservations.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
        <Table className="w-full text-left">
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200/80">
              <TableHead className="font-semibold text-slate-700 py-3.5">Room Name</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5">Check-in</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5">Check-out</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5 text-center">Rooms</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5">Price</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsData?.length > 0 ? (
              bookingsData.map((booking) => (
                <TableRow key={booking._id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none">
                  <TableCell className="font-semibold text-slate-800">{booking.roomName}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{format(new Date(booking.checkin), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{format(new Date(booking.checkout), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-slate-700 text-center font-medium">{booking.bookedRoom}</TableCell>
                  <TableCell className="font-semibold text-slate-900">${booking.bookingPrice}</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-none capitalize hover:bg-emerald-100">
                      {booking.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-400">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}