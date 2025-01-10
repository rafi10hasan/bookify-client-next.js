import Amenities from "@/components/Home/Amenities";
import Carousel from "@/components/Home/Carousel";
import Reservation from "@/components/Home/Reservation";
import Restaurent from "@/components/Home/Restaurent";
import Reviews from "@/components/Home/Reviews";
 
export default function HomePage() {
  
  return (
     <div className="space-y-24">
           <Carousel/>
           <Reservation/>
           <Amenities/>
           <Reviews/>
           <Restaurent/>
    </div>
  );
}
