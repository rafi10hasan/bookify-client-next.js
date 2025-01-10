import { auth } from "@/auth.config";
import PhotoGallery from "./PhotoGallery";
import ReviewSection from "./ReviewSection";
import RoomDescription from "./RoomDescription";
import RoomDetails from "./RoomDetails";
import RoomRating from "./RoomRating";
import { redirect } from "next/navigation";

 
export default function SingleRoomPageDetails ({singleRoom}) {
  const session = auth();
  if(!session){
    redirect('/login')
  }
  return (
    <>
       <PhotoGallery room={singleRoom}/>
       <RoomDescription room={singleRoom}/>
       <RoomDetails room ={singleRoom}/>
       <RoomRating room ={singleRoom}/>    
       <ReviewSection room={singleRoom}/>        
    </>
  );
}
