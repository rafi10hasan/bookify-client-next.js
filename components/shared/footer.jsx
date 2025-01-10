import Image from "next/image";
import visa from '../../public/visa.png'
export default function Footer () {
  return (
    <footer className=" bg-midnight text-white">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10 px-10 h-auto shadow-md">
         <div className='flex flex-col gap-4'>
             <h1 className="text-xl mb-2 font-semibold">Luxurios Hotel</h1>
             <p className="w-[220px]">All hotels and vacation rental properties listed on this website.</p>
             <Image className="w-24 lg:w-2/5 object-cover" src={visa} alt="visa" />
         </div>
         
         <div className='flex flex-col gap-4'>
              <h1 className="text-xl mb-2 font-semibold">For Customers</h1>
              <h2>About Luviana</h2>
              <h2>Customer Care/Help</h2>
              <h2>Corporate Accounts</h2>
              <h2>Financial Information</h2>
              <h2>Terms & Conditions</h2>
         </div>
         
         <div className='flex flex-col gap-4'>
              <h1 className="text-xl mb-2 font-semibold">Recent News</h1>
              <h2>Our Secret Island Boat Tour</h2>
              <h2>September in Luxurios Hotel</h2>
              <h2>Live Music Concerts at Luxurius</h2>
         </div>

         <div className='flex flex-col gap-4'>
            <h1 className="text-xl mb-2 font-semibold">contact us</h1>
          3015 Grand Aveenue

           <h2>hello@luxurius.com</h2>
           <h2>+889218219812</h2>
           <h2>24/7 Customer Service</h2>
         </div>

    </div>
    </footer>
  );
}
