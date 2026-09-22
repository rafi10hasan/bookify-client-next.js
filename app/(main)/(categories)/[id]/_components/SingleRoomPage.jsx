import { auth } from "@/auth.config";
import PhotoGallery from "./PhotoGallery";
import ReviewSection from "./ReviewSection";
import RoomDescription from "./RoomDescription";
import RoomDetails from "./RoomDetails";
import RoomRating from "./RoomRating";
import { redirect } from "next/navigation";

export default async function SingleRoomPageDetails({ singleRoom }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Photo Gallery Grid */}
      <PhotoGallery room={singleRoom} />

      {/* Main Content Layout */}
      <div className="space-y-8">
        <RoomDescription room={singleRoom} />
        
        <div className="border-t border-gray-100 pt-8">
          <RoomDetails room={singleRoom} />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <RoomRating room={singleRoom} />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <ReviewSection room={singleRoom} />
        </div>
      </div>
    </div>
  );
}