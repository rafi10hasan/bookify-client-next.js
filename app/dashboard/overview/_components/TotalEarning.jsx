import { DollarSign } from "lucide-react";

export default function TotalEarning({ totalEarning }) {
  const revenue = totalEarning && totalEarning.length > 0 ? totalEarning[0]?.totalRevenue : 0;

  return (
    <div className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Total Earning
        </p>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
          ${(revenue || 0).toLocaleString()}
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 font-medium">Lifetime revenue</p>
      </div>
    </div>
  );
}