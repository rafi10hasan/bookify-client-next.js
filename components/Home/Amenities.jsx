import Image from "next/image";
import image1 from "../../public/classic-double-room.jpg"
import { FaSwimmer } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import { TbMassage } from "react-icons/tb";
import { TbAirConditioning } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import { PiHairDryerFill } from "react-icons/pi";
import { FaCarOn } from "react-icons/fa6";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { CgGames } from "react-icons/cg";
export default function Amenities () {
  return (
    <div className="relative">
    <Image src={image1} alt="swimmingpoll" quality={100} style={{
             width:"100%",
             height:"500px",
             objectFit: 'cover', // cover, contain, none
          }} />
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    <div className="absolute -top-6 right-0 md:right-40 bg-cyan-700 text-white p-8 max-[580px]:w-full h-[550px] rounded-none md:rounded-lg shadow-lg w-[450px]">
        <h2 className="text-3xl font-bold mb-4">Our Amenities</h2>
        <p className="mb-6">Hotels offer a wide range of amenities to enhance your stay. Enjoy complimentary Wi-Fi to stay connected, along with 24/7 front desk support for any assistance. Many hotels provide a swimming pool, fitness center, and spa services for relaxation and wellness.</p>
        <ul className="grid grid-cols-2 gap-3 spac-y-1 text-gray-200 font-semibold tracking-wider">
            <li className="flex items-center gap-2"><FaSwimmer/> Swimming pool</li>
            <li className="flex items-center gap-2"><GrYoga /> Gym & yoga</li>
            <li className="flex items-center gap-2"><TbMassage /> Spa & massage</li>
            <li className="flex items-center gap-2"><TbAirConditioning /> air conditioning</li>
            <li className="flex items-center gap-2"><FaWifi /> Free wi-fi</li>
            <li className="flex items-center gap-2"><PiHairDryerFill /> hairdryer</li>
            <li className="flex items-center gap-2"><FaCarOn/> car-parking</li>
            <li className="flex items-center gap-2"><MdOutlineCoffeeMaker /> tea-coffe maker</li>
            <li className="flex items-center gap-2"><MdOutlineLocalLaundryService /> laundry</li>
            <li className="flex items-center gap-2"><CgGames /> video games</li>
          
        </ul>
    </div>
</div>
  );
}
