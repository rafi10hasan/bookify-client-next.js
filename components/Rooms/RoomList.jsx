import RoomCard from "./room-card";

export default function RoomList ({fromSearchPage,rooms,checkin,checkout}) {
 
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
