 
export default function RoomDescription ({room}) {
    const {description} = room
  return (
    <>

      <p className="text-slate-700">{description}</p>
 
    </>
  );
}
