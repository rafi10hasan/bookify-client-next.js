import RoomForm from "../../_components/RoomForm";

export default async function editRoomPage({ params }) {
  const { id } = await params;
  try {
    const response = await fetch(`http://localhost:5000/rooms/${id}`, {
      headers:{
        "Content-Type":"application/json"
      },
      cache: "no-store",
    });
    const {room,accommodation} = await response.json();
    room.accommodation = accommodation.totalRooms;
    const amenities = room?.amenities.map((amenity) => amenity.name);
    return (
      <>
        <RoomForm initialData={room} roomId={id} amenitiesData={amenities}/>
      </>
    );
  } catch (error) {
    throw new Error(error)
  }
  
}
