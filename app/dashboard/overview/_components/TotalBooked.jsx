import { formatNumber } from "@/utils/formatNumber";
import { Book } from "lucide-react";

export default function TotalBooked({ totalBooked }) {
  const booked = formatNumber(totalBooked);
  return (
    <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
      <Book className="text-orange-600" />
      <h1>Total Booked</h1>
      <h1 className="text-2xl font-semibold">{booked}</h1>
    </div>
  );
}
