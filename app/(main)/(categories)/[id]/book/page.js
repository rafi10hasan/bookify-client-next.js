
import { auth } from "@/auth.config";
import Booking from "./_components/Booking";
import { redirect } from "next/navigation";


export default async function BookingPage({params,searchParams}){
    
    const session = await auth();
    if(!session){
      redirect('/login')
    }
    const {id} = params;
    const{checkin,checkout,selectedRoom,price,title} = searchParams;
    return (
        <section className="h-screen flex flex-col justify-center">
        <div className="max-w-[650px] w-[90vw] mx-auto space-y-3 border border-gray-700/20 rounded-md bg-white">
          <h4 className="font-bold text-xl text-center mt-4 text-deep-yellow">Booking Details..</h4>
          <Booking
            checkin={checkin}
            checkout={checkout}
            room={selectedRoom}
            price={price}
            title={title}
            roomId={id}
            userId={session.id}
          />
        </div>
      </section>
    );
}