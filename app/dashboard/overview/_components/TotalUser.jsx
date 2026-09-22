import { formatNumber } from "@/utils/formatNumber";
import { UsersIcon, TrendingUp } from "lucide-react";

export default function TotalUser({ totalUser }) {
  const users = formatNumber(totalUser);

  return (
    <div className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <UsersIcon className="w-6 h-6" />
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <TrendingUp className="w-3 h-3" /> +12.5%
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Total Users
        </p>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
          {(totalUser || 0).toLocaleString()}<span className="text-blue-600">+</span>
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 font-medium">{users}</p>
      </div>
    </div>
  );
}