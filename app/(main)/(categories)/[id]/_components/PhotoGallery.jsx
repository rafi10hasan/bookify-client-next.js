import Image from "next/image";

export default function PhotoGallery({ room }) {
  const { gallery = [], image, title } = room;
  const allImages = [image, ...gallery].filter(Boolean);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[380px] md:h-[460px] rounded-2xl overflow-hidden shadow-sm">
        {/* Large Feature Image */}
        <div className="md:col-span-2 relative h-full group overflow-hidden">
          <Image
            src={allImages[0] || "/placeholder.jpg"}
            alt={title || "Room"}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Secondary Images Grid */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
          {allImages.slice(1, 5).map((img, index) => (
            <div key={index} className="relative h-full group overflow-hidden bg-gray-100">
              <Image
                src={img}
                alt={`${title} gallery ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}