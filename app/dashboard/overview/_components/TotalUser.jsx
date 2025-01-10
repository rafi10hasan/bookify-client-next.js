import { formatNumber } from "@/utils/formatNumber";
import { BedIcon, User2 } from "lucide-react";

 
export default function TotalUser ({totalUser}) {
   const users = formatNumber(totalUser)
  return (
    <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
      <User2 className="text-red-500"/>
      <h1>Total user</h1>
      <h1 className="text-2xl font-semibold">{users}</h1>
    </div>
  );
}
