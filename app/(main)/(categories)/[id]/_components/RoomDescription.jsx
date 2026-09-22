export default function RoomDescription({ room }) {
  const { description, title } = room;
  
  return (
    <div className="space-y-3">
      {title && <h1 className="text-3xl font-bold text-gray-900 capitalize">{title}</h1>}
      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
        {description}
      </p>
    </div>
  );
}