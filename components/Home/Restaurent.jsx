import Image from "next/image";
import image4 from "../../public/group-friends.jpg";
import image2 from "../../public/restaurant-hall.jpg";
import image3 from "../../public/restaurant-interior_1127-3394.jpg";
import image1 from "../../public/restaurant-private-room-with-table.jpg";

const images = [
  {
    img: image1,
  },
  {
    img: image2,
  },
  {
    img: image3,
  },
  {
    img: image4,
  },
];
export default function Restaurent() {
  return (
    <section className="w-full bg-slate-50 py-16">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-10 px-6 lg:px-12">
        {/* Text Content */}
        {/* Image */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {images.map((image,index) => (
            <Image
              key={index}
              src={image.img}
              alt="hotel image"
              className="w-full h-[250px] object-cover rounded-md shadow-lg"
            />
          ))}
        </div>

        <div className="lg:w-1/2 bg-white shadow-md p-6 rounded-md lg:text-left">
          <h1 className="text-3xl font-bold text-gray-600 leading-tight">
            Our Restaurent
          </h1>
          <p className="text-sm md:text-[16px] text-gray-600 leading-relaxed mt-4">
            The ambiance of our restaurant is thoughtfully designed to create the perfect setting
            for any occasion. Elegant interiors, soft lighting, and comfortable seating make it an
            ideal spot for intimate gatherings, family meals, or even casual meetups. <span className="hidden md:inline">For those
            looking to make their dining experience extra special, our outdoor seating area offers
            stunning views, creating a serene environment where you can enjoy your meal while
            soaking in the besides.</span> 
          </p>
         
        
              <div className="flex justify-around mt-10">
                {/* <!-- card start --> */}
             
            
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 flex justify-center items-center">
                        <Image
                          src="/breakfast-logo.jpg"
                          className="rounded-full max-w-full max-h-full w-auto"
                          alt="breakfast"
                          width={100}
                          height={100}
                        />
                      </div>
                      
                        <h2 className="text-lg font-bold leading-none my-2">Breakfast</h2>
                    </div>
                  
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 flex justify-center items-center">
                        <Image
                          src="/lunch-time-logo.jpg"
                          className="rounded-full max-w-full max-h-full w-auto"
                          alt="lunch"
                          width={100}
                          height={100}
                        />
                      </div>
                      
                        <h2 className="text-lg font-bold leading-none my-2">Lunch</h2>
                    </div>


                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 flex justify-center items-center">
                        <Image
                          src="/dinner.jpg"
                          className="rounded-full max-w-full max-h-full w-auto"
                          alt="dinner"
                          width={100}
                          height={100}
                        />
                      </div>
                      
                        <h2 className="text-lg font-bold leading-none my-2">Dinner</h2>
                    </div>
              
                

              </div>
            </div>
      
        </div>
   
    </section>
  );
}
