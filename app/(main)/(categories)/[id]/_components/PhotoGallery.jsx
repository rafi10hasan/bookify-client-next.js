import Image from "next/image";

export default function PhotoGallery({ room }) {
  const { gallery, image, title } = room;
  return (
    <>
    <Image
      className="h-[300px] md:h-[400px] w-full object-cover rounded-sm"
      src={image}
      width={400}
      height={300}
      alt="room"
    />
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gallery?.length > 0 &&
          gallery.map((img, index) => (
            <Image
              key={index}
              src={img}
              width={400}
              height={350}
              className="object-cover h-60 rounded-sm"
              alt={title}
            />
          ))}
      </div>
    </div>
  </>
  
  );
}
