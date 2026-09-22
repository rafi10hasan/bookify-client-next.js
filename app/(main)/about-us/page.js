import Image from "next/image";
import image1 from "../../../public/building-night_1127-3365.jpg";
import image2 from "../../../public/beautiful-young-woman-sitting.jpg";

const stories = [
  {
    title: "Our Mission",
    description:
      "At Luxurious, our mission is to provide more than just a place to stay – we aim to create lasting memories for every guest. From our elegantly appointed rooms and suites to our top-notch amenities, we ensure every detail of your visit is thoughtfully designed. Our dedicated team is passionate about delivering warm and personalized service, making you feel at home from the moment you arrive.",
    image: image1,
  },
  {
    title: "A Haven of Relaxation and Elegance",
    description:
      "Our hotel is a perfect blend of relaxation and elegance, offering a tranquil escape amidst the bustling city. With state-of-the-art facilities, a rejuvenating spa, and stunning views, every aspect of your stay is crafted to provide the utmost comfort. Whether you’re here for a romantic getaway, a family vacation, or a corporate retreat, we ensure your experience is nothing short of exceptional.",
    image: image2,
  },
];

export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0b1727] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="text-amber-600 font-bold text-xs md:text-sm uppercase tracking-widest block mb-2">
            Welcome to Luxurious
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            About Us
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            At Luxurious, we blend luxury, comfort, and world-class hospitality to offer you an unforgettable stay. Located in the heart of USA, our hotel provides a serene escape for travelers, whether for leisure or business. Discover elegantly designed rooms, exceptional dining experiences, and impeccable service.
          </p>
        </div>

        {/* Stories Section */}
        <div className="space-y-16 md:space-y-24">
          {stories.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col lg:items-center gap-8 lg:gap-16 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-4 text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Image Wrapper */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}