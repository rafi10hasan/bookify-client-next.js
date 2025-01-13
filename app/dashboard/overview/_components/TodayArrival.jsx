import { formatNumber } from "@/utils/formatNumber";
import { BusFront } from "lucide-react";

 
export default function TodayArrival ({todayArrival}) {
    const arrival = formatNumber(todayArrival)
  return (
    <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
    <BusFront className="text-orange-600" />
    <h1>Today Arrival</h1>
    <h1 className="text-2xl font-semibold">{arrival}</h1>
  </div>
  );
}
