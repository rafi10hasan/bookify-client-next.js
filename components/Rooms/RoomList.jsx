import { auth } from "@/auth.config";
import RoomCard from "./room-card";
import { redirect } from "next/navigation";

export default async function RoomList ({fromSearchPage,rooms,checkin,checkout}) {
  
  const session = await auth();
     if(!session){
       redirect('/login')
     }
  return (
    <>
            <div className="space-y-4">
                {rooms.length > 0 &&
                    rooms.map((room) => (
                        <RoomCard
                            key={room._id}
                            room={room}
                            fromSearchPage={fromSearchPage}
                            checkin={checkin}
                            checkout={checkout}
                        /> 
                    )
                ) }
            </div>
    </>
  );
}
