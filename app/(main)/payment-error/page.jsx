import { SquareX } from "lucide-react";

 
export default function paymentError () {
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
         
          <SquareX className="w-16 h-16 mt-6 bg-red-600 rounded-full p-0 text-white" />
                <h1 className="text-xl md:text-2xl lg:text-3xl">
                  payment failed... please try again with valid credential
                </h1>
    
         </div>
</div>
  );
}
