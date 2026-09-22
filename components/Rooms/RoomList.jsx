import { auth } from "@/auth.config";
import RoomCard from "./room-card";
import { redirect } from "next/navigation";

export default async function RoomList({ fromSearchPage, rooms = [], checkin, checkout }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-500">
        No rooms found matching your criteria.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {rooms.map((room) => (
        <RoomCard
          key={room._id}
          room={room}
          fromSearchPage={fromSearchPage}
          checkin={checkin}
          checkout={checkout}
        />
      ))}
    </div>
  );
}