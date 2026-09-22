import { formatNumber } from "@/utils/formatNumber";
import { Book } from "lucide-react";

export default function TotalBooked({ totalBooked }) {
  const booked = formatNumber(totalBooked);

  return (
    <div className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
          <Book className="w-6 h-6" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Total Booked
        </p>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
          {(totalBooked || 0).toLocaleString()}<span className="text-orange-600">+</span>
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 font-medium">{booked}</p>
      </div>
    </div>
  );
}