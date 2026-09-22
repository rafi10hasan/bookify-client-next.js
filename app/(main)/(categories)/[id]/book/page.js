import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Booking from "./_components/Booking";

// যদি আপনার ব্যাকএন্ডে API বা DB Helper থাকে, সেখান থেকে room fetch করা শ্রেয়
// import { getRoomById } from "@/db/queries"; 

export default async function BookingPage({ params, searchParams }) {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { id } = resolvedParams;
  const { checkin, checkout, selectedRoom, price, title } = resolvedSearchParams;


  // safe parsing
  const parsedPrice = Number(price) || 0;
  const parsedRoom = Number(selectedRoom) || 1;

  return (
    <section className="min-h-screen py-10 flex flex-col justify-center items-center">
      <div className="max-w-[650px] w-[90vw] mx-auto space-y-3 border border-gray-700/20 rounded-md bg-white">
        <h4 className="font-bold text-xl text-center mt-4 text-amber-500">
          Booking Details
        </h4>

        <Booking
          checkin={checkin}
          checkout={checkout}
          room={parsedRoom}
          price={parsedPrice}
          title={title || "Room Booking"}
          roomId={id}
          userId={session?.user?.id || session?.id}
        />
      </div>
    </section>
  );
}