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

export default function UpcomingBooking({ upcomingBookings }) {
  if (!upcomingBookings || upcomingBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-slate-500 font-medium text-sm">
          No upcoming bookings found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow className="bg-slate-50/70 hover:bg-slate-50/70 border-b border-slate-200/80">
              <TableHead className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Room Name
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Booking Date
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                End Date
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                Booked Room
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Booking Price
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                Payment Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-100">
            {upcomingBookings.map((booking) => (
              <TableRow
                key={booking._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="py-4 px-6 font-semibold text-slate-900 capitalize">
                  {booking.roomName}
                </TableCell>

                <TableCell className="py-4 px-6 whitespace-nowrap text-slate-600 text-sm">
                  {booking.checkin ? format(new Date(booking.checkin), "PPP") : "N/A"}
                </TableCell>

                <TableCell className="py-4 px-6 whitespace-nowrap text-slate-600 text-sm">
                  {booking.checkout ? format(new Date(booking.checkout), "PPP") : "N/A"}
                </TableCell>

                <TableCell className="py-4 px-6 text-center font-medium text-slate-700">
                  {booking.bookedRoom}
                </TableCell>

                <TableCell className="py-4 px-6 text-right font-semibold text-slate-900 whitespace-nowrap">
                  ${booking.bookingPrice}
                </TableCell>

                <TableCell className="py-4 px-6 text-center whitespace-nowrap">
                  <Badge
                    variant="outline"
                    className={`capitalize px-3 py-1 text-xs font-medium rounded-full ${
                      booking.paymentStatus?.toLowerCase() === "paid"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {booking.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}