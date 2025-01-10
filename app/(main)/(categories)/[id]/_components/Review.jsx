import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getBackgroundColor } from "@/utils/user-color-name";
import { format } from "date-fns";

export default function Review({ review }) {
  const { message, createdOn } = review;
  const { firstname, lastname, image } = review?.userId;
  const fullName = firstname.concat(" ", lastname);
  const formattedDate = format(new Date(createdOn), "MMMM d, yyyy 'at' h:mm a");
  const bgColor = getBackgroundColor(firstname);

  return (
    <>
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Avatar className="w-[50px] h-[50px] rounded-full">
            <AvatarImage className="object-cover" src={image} />
            <AvatarFallback style={{ backgroundColor: bgColor }} className={cn("text-white")}>
              {firstname[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Review Content */}
        <div className="flex-1 space-y-1 mb-4">
          <h3 className="text-sm font-semibold uppercase text-gray-700">{fullName}</h3>
          <p className="text-xs text-gray-500 mb-2">{formattedDate}</p>

          {/* Review Text */}
          <p className="text-sm text-gray-700 mt-2">{message}</p>
        </div>
      </div>
    </>
  );
}
