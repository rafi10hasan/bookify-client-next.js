import CheckRoom from "@/components/Rooms/check-room";
import { StarIcon } from "lucide-react";
import SingleRoomPageDetails from "@/app/(main)/(categories)/[id]/_components/SingleRoomPage";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { notFound } from 'next/navigation';

export default async function singeleRoomDetails({ params ,searchParams}) {
  const { id } = await params;
  const session = auth();
  if(!session){
    redirect('/login')
  } 
  const {checkin,checkout,selectedRoom} = await searchParams;

  const response = await fetch(`http://localhost:5000/rooms/${id}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    },
    cache: "no-store"
  });
  const {room} = await response.json();
   if(!room){
      notFound()
   }
  return (
    <div className="mt-14">
        <div className="flex justify-center mb-2">
          {
            Array.from({length:5},(_,i)=>(
              <StarIcon key={i} fill="orange" className="size-4 border-orange-400"/>
            ))
          }
        </div>
        <div>
            <h1 className="text-2xl font-semibold text-deep-cyan text-center">{room.title}</h1>
        </div>
      <div className="w-[90vw] mx-auto grid gap-6 lg:gap-16 grid-cols-12 mt-6">
          <div className="col-span-12 order-2 lg:order-1 lg:col-span-8 space-y-6">
               <SingleRoomPageDetails singleRoom={room}/>
          </div>

          <div className="col-span-12 order-1 lg:order-2 lg:col-span-4">
                <CheckRoom
                singleRoom={room}
                checkin={checkin}
                checkout={checkout}
                room = {selectedRoom}
                />
          </div>
      </div>
    </div>
  );
}
