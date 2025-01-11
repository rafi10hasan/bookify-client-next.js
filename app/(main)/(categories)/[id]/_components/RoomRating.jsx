"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RatingBar } from "./RatingBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function RoomRating({ room }) {
  const { ratings, title, _id } = room;
  const [hover, setHover] = useState(null); // For hover state
  const [rating, setRating] = useState(0);
  const [currentRating,setCurrentRating] = useState(0);
  const [isVerifyPurchase,setIsVerifyPurchase] = useState(false)
  const [open, setOpen] = useState(false);
  const session = useAuth();
  console.log(session.data)
  const router = useRouter()
  const totalRatings = ratings?.length;
  const avgRating = totalRatings
    ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings
    : 0;

  // Calculate percentage for each rating
  const calculatePercentage = (ratingValue) => {
    const count = ratings?.filter((rating) => rating.rating === ratingValue).length;
    return totalRatings ? (count / totalRatings) * 100 : 0;
  };

  const handleRatingButtonClick = () => {
    if (!session?.data?.id) { // If user is not logged in, navigate to login
      router.push('/login');
    } else {
      setOpen(!open); // Open the dialog if user is logged in
    }
  };
  

  const getUserRatingByRoom = useCallback( async () => {

      try {
        if(session?.data && _id){
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating/${session?.data?.id}/${_id}`);
          if (!response.ok) throw new Error('Failed to fetch rating');
          
          const data = await response.json();
          setCurrentRating(data.rating);
        }

        else{
          return;
        }
       
      } catch (error) {
        throw new Error(error)
      }
  },[_id,session]);

 useEffect(()=>{
    async function isUserBookedThisRoom(){
      try {
        if (session?.data && _id) {
          console.log('access') // Ensure both values are defined
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/booking/verify-purchase-room/${session?.data?.id}/${_id}`
          );
          const data = await response.json();
          if (data.isVerifyPurchase) {
            setIsVerifyPurchase(true);
          }
        }
      }catch(err){
        throw new Error(err)
      }
       
    }

      isUserBookedThisRoom()
    
    
 },[session,_id])

  useEffect(() => {
    getUserRatingByRoom();
  }, [getUserRatingByRoom]);

  async function handleSubmit(e){
    e.preventDefault();
    const userId = session?.data?.id
    
    const data = {
      roomId:_id, 
      userId: userId,
      rating:rating
    }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok && response.status === 201) {
          setOpen(false);
          getUserRatingByRoom()
          router.refresh()
        } 
      } catch (error) {
         throw new Error(error)
      }

  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-2">
        <h1 className="text-xl font-semibold">Average Rating</h1>
        <span className="text-2xl text-deep-yellow font-extrabold">{avgRating.toFixed(1)}/5</span>
      </div>

      <div className="col-span-12 md:col-span-6 space-y-2 font-semibold text-deep-cyan">
        <RatingBar label="Rating 5" percentage={calculatePercentage(5)} />
        <RatingBar label="Rating 4" percentage={calculatePercentage(4)} />
        <RatingBar label="Rating 3" percentage={calculatePercentage(3)} />
        <RatingBar label="Rating 2" percentage={calculatePercentage(2)} />
        <RatingBar label="Rating 1" percentage={calculatePercentage(1)} />
      </div>

      <div className="col-span-12 md:col-span-4 justify-self-start md:justify-self-center ">
        {isVerifyPurchase && (
             <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
             <DialogTrigger asChild>
               <Button
                 className={cn("bg-deep-yellow text-white font-semibold hover:bg-light-yellow")}
                 variant="outline"
                 onClick={handleRatingButtonClick}
               >
                 give a rating
                 <StarIcon />
               </Button>
             </DialogTrigger>
             <DialogContent className="w-[320px] mx-auto bg-midnight">
              
               <DialogHeader>
                 <StarIcon className="size-10 text-deep-yellow mx-auto" />
                 <DialogTitle className="text-white text-center">Rate this</DialogTitle>
                 <DialogDescription className="text-center">{title}</DialogDescription>
               </DialogHeader>
                 <div className="flex justify-center border-0 gap-2">
                   {[...Array(5)].map((_, index) => (
                     <StarIcon
                       key={index}
                       index={index}
                       hover={hover}
                       rating={rating}
                       fill={(hover || rating) > index ? "orange" : "gray"}
                       className="w-8 h-8 cursor-pointer transition-colors text-orange-50"
                       onMouseEnter={() => setHover(index + 1)}
                       onMouseLeave={() => setHover(null)}
                       onClick={() => setRating(index + 1)}
                     />
                   ))}
                 </div>
               <DialogFooter className={cn("justify-self-center")}>
                 <form  onSubmit={handleSubmit}>
                 <Button className="bg-deep-yellow hover:bg-light-yellow w-full" type="submit">
                   rate
                 </Button>
                 </form>
               </DialogFooter>
             </DialogContent>
             <h1 className="text-lg mt-2">Your Rating :  <StarIcon fill="orange" className="text-deep-yellow"/> <span className="font-semibold text-deep-cyan">{currentRating}</span> / <span className="font-meduim text-gray-600">5</span></h1>
           </Dialog>

        )}
       
      </div>
    </div>
  );
}
