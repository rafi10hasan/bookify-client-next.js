"use client";
import { cn } from "@/lib/utils";
import { addDays, format} from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

export default function CheckRoom({ singleRoom ,checkin,checkout,room} ) {
 
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const [checkinDate, setCheckinDate] = useState(new URLSearchParams(searchParams).get('checkin') || null);
  const [checkoutDate, setCheckoutDate] = useState(new URLSearchParams(searchParams).get('checkout') || null);
  const [foundRoom,setFoundRoom] = useState(null);
  const [loading,setLoading] = useState(false);
  const [selectedRoom,setSelectedRoom] = useState(null)
  const [isCheckinPopoverOpen, setCheckinPopoverOpen] = useState(false);
  const [isCheckoutPopoverOpen, setCheckoutPopoverOpen] = useState(false);
  const { title, price, _id:roomId } = singleRoom;
  
  let params = ""
  if(checkin && checkout && room){
    params = `?checkin=${checkin}&checkout=${checkout}&selectedRoom=${room}&price=${price}&title=${title}`
  }

  async function handleCheckSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    try{
      await new Promise((resolve)=>setTimeout(()=>{resolve()},2000))
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check/availability`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({checkinDate,checkoutDate,roomId})
      })
   
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if(data){
        setFoundRoom(data.availableRoom);
        setLoading(false)
      }
    }catch(err){
      throw new Error(err)
    }finally{
      setLoading(false)
    }
  }

  function generateQuery(key,value){
    const params = new URLSearchParams(searchParams);
    params.set(key,value);
    replace(`${pathname}?${params.toString()}`)
  }

  const handleCheckinDateChange = (date) => {
    const formattedDate = format(date,"MM/dd/yy")
    generateQuery('checkin',formattedDate)
    setCheckinDate(date);
    setCheckinPopoverOpen(false);
    setFoundRoom(null); // Reset room availability
    setCheckoutDate(null)
  };

  const handleCheckoutDateChange = (date) => {
    const formattedDate = format(date,"MM/dd/yy")
    generateQuery('checkout',formattedDate)
    setCheckoutDate(date);
    setCheckoutPopoverOpen(false);
    setFoundRoom(null); // Reset room availability
  };

  const handleRoomSelection = (room) => {
    generateQuery('selectedRoom',room)
    setSelectedRoom(Number(room));
  };

  return (
    <div className="shadow-xl bg-white w-full h-auto p-4">
      <h2 className="text-xl text-center font-semibold text-deep-yellow mb-2">{price}$ per night</h2>

      <form onSubmit={handleCheckSubmit} className="space-y-6">
      {/* Check-in Field */}
      <Popover className="relative" open={isCheckinPopoverOpen} onOpenChange={setCheckinPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !checkinDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {checkinDate ? format(checkinDate, 'PPP') : <span>Check-in date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2 absolute z-50">
          <Calendar
            mode="single"
            disabled={{ before: new Date() }}
            selected={checkinDate}
            onSelect={handleCheckinDateChange} // Use updated handler 
          />
        </PopoverContent>
      </Popover>

      {/* Check-out Field */}
      <Popover className="relative" open={isCheckoutPopoverOpen} onOpenChange={setCheckoutPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={!checkinDate}
            className={cn(
              "w-full justify-start text-left font-normal",
              !checkoutDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {checkoutDate ? format(checkoutDate, 'PPP') : <span>Check-out date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2 absolute z-50">
          <Calendar
            mode="single"
            disabled={{ before: checkinDate ? addDays(checkinDate, 1) : new Date() }}
            selected={checkoutDate}
            onSelect={handleCheckoutDateChange} // Use updated handler
          />
        </PopoverContent>
      </Popover>

      {/* Room Availability Display */}
      {loading ? (
        <p>Loading room availability...</p>
      ) : foundRoom !== null ? (
        foundRoom > 0 ? (
          <>
            <h1 className="font-semibold text-deep-cyan">We have found {foundRoom} available rooms for this date</h1>
            <Select className="w-full" onValueChange={handleRoomSelection}>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue className="text-black z-50" placeholder="Select a Room" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Available rooms</SelectLabel>
                  {Array.from({ length: foundRoom }, (_, i) => (
                    <SelectItem key={i} value={`${i+1}`}>{i + 1}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedRoom && <p className="text-deep-yellow font-semibold">You have selected room <span className="text-deep-cyan">{selectedRoom}</span></p>}
          </>
        ) : (
          <p className="font-semibold text-red-600">No rooms available for this date.</p>
        )
      ) : null}

      {/* Submit Button */}
      <div className="col-span-12 w-full md:col-span-12 lg:col-span-2 flex justify-start mt-8">
        {foundRoom === 0 || foundRoom === null ? (
          <Button
            type="submit"
            disabled={!checkinDate || checkinDate >= checkoutDate || foundRoom === 0}
            className="w-full text-black font-semibold bg-light-yellow hover:bg-deep-cyan hover:text-white tracking-wide"
          >
            {loading ? (
              <>
                Check availability <Loader className="animate-spin"/>
              </>
            ) : (
              "Check availability"
            )}
          </Button>
        ) : (
         <Button disabled={selectedRoom===null} className="w-full text-black font-semibold bg-light-yellow hover:bg-deep-cyan hover:text-white tracking-wide"> <Link className="w-full" href={`/${roomId}/book${params}`}>Book Reservation</Link></Button>
        )}
      </div>
    </form>
    </div>
  );
}
