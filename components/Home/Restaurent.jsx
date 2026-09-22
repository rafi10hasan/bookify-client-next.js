import Image from "next/image";
import image1 from "../../public/restaurant-private-room-with-table.jpg";
import image2 from "../../public/restaurant-hall.jpg";
import image3 from "../../public/restaurant-interior_1127-3394.jpg";
import image4 from "../../public/group-friends.jpg";

const images = [
  { img: image1, alt: "Private Dining" },
  { img: image2, alt: "Restaurant Hall" },
  { img: image3, alt: "Restaurant Interior" },
  { img: image4, alt: "Friends Dining" },
];

const meals = [
  {
    title: "Breakfast",
    image: "/breakfast-logo.jpg",
    time: "07:00 AM - 10:30 AM",
  },
  {
    title: "Lunch",
    image: "/lunch-time-logo.jpg",
    time: "12:30 PM - 03:30 PM",
  },
  {
    title: "Dinner",
    image: "/dinner.jpg",
    time: "07:00 PM - 10:30 PM",
  },
];

export default function Restaurent() {
  return (
    <section className="w-full bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-10 items-stretch">
        
        {/* Left Side: Images Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-1/2 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-block px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
              Culinary Experience
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Our Restaurant
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
              The ambiance of our restaurant is thoughtfully designed to create the perfect setting
              for any occasion. Elegant interiors, soft lighting, and comfortable seating make it an
              ideal spot for intimate gatherings, family meals, or even casual meetups. For those looking
              to make their dining experience extra special, our outdoor seating area offers stunning
              views, creating a serene environment where you can enjoy your meal while soaking in the surroundings.
            </p>
          </div>

          {/* Meals Cards Section */}
          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-100">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:shadow-md hover:border-amber-200 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded-full overflow-hidden p-0.5 bg-white border border-slate-200 group-hover:border-amber-400 transition-colors shadow-sm mb-2">
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    width={56}
                    height={56}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>

                <h2 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                  {meal.title}
                </h2>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-1">
                  {meal.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}