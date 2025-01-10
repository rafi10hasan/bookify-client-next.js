import { formatNumber } from "@/utils/formatNumber";
import { DollarSign } from "lucide-react";

 
export default function TotalEarning ({totalEarning}) {
  
  return (
    <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
    <DollarSign className="text-purple-600" />
    <h1>Total Earning</h1>
    <h1 className="text-2xl font-semibold">{totalEarning[0].totalRevenue}$</h1>
  </div>
  );
}
