
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getBackgroundColor } from "@/utils/user-color-name";
import { format } from "date-fns";

export default function Review({ review }) {
  const { message, createdOn, userId } = review || {};
  const firstname = userId?.firstname || "Guest";
  const lastname = userId?.lastname || "";
  const image = userId?.image;
  const fullName = `${firstname} ${lastname}`.trim();
  
  const formattedDate = createdOn 
    ? format(new Date(createdOn), "MMM d, yyyy")
    : "";
    
  const bgColor = getBackgroundColor(firstname);

  return (
    <div className="py-4 flex items-start space-x-4">
      <Avatar className="w-10 h-10 rounded-full border border-gray-100">
        <AvatarImage className="object-cover" src={image || null} />
        <AvatarFallback style={{ backgroundColor: bgColor }} className="text-white text-xs font-semibold">
          {firstname[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900 capitalize">{fullName}</h4>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed pt-1">{message}</p>
      </div>
    </div>
  );
}