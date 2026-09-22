"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function CheckRoom({ singleRoom, checkin, checkout, room }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialCheckin = searchParams.get("checkin") ? new Date(searchParams.get("checkin")) : null;
  const initialCheckout = searchParams.get("checkout") ? new Date(searchParams.get("checkout")) : null;

  const [checkinDate, setCheckinDate] = useState(initialCheckin);
  const [checkoutDate, setCheckoutDate] = useState(initialCheckout);
  const [foundRoom, setFoundRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isCheckinPopoverOpen, setCheckinPopoverOpen] = useState(false);
  const [isCheckoutPopoverOpen, setCheckoutPopoverOpen] = useState(false);

  const { title, price, _id: roomId } = singleRoom || {};

  let params = "";
  if (checkin && checkout && room) {
    params = `?checkin=${checkin}&checkout=${checkout}&selectedRoom=${room}&price=${price}&title=${title}`;
  }

  function generateQuery(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  async function handleCheckSubmit(e) {
    e.preventDefault();
    if (!checkinDate || !checkoutDate) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkinDate: format(checkinDate, "yyyy-MM-dd"),
          checkoutDate: format(checkoutDate, "yyyy-MM-dd"),
          roomId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFoundRoom(data?.availableRoom ?? 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleCheckinDateChange = (date) => {
    if (!date) return;
    const formattedDate = format(date, "yyyy-MM-dd");
    generateQuery("checkin", formattedDate);
    setCheckinDate(date);
    setCheckinPopoverOpen(false);
    setFoundRoom(null);
    setCheckoutDate(null);
    generateQuery("checkout", "");
  };

  const handleCheckoutDateChange = (date) => {
    if (!date) return;
    const formattedDate = format(date, "yyyy-MM-dd");
    generateQuery("checkout", formattedDate);
    setCheckoutDate(date);
    setCheckoutPopoverOpen(false);
    setFoundRoom(null);
  };

  const handleRoomSelection = (roomNum) => {
    generateQuery("selectedRoom", roomNum);
    setSelectedRoom(Number(roomNum));
  };

  return (
  
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md sticky top-28 self-start transition-all">
      {/* Price Header */}
      <div className="text-center pb-5 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ${price}
          </span>
          <span className="text-sm font-medium text-slate-500">/ night</span>
        </div>
      </div>

      <form onSubmit={handleCheckSubmit} className="space-y-4">
        {/* Check-in Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Check-in Date
          </label>
          <Popover open={isCheckinPopoverOpen} onOpenChange={setCheckinPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-sm",
                  !checkinDate && "text-slate-400"
                )}
              >
                <CalendarIcon className="mr-2.5 h-4 w-4 text-teal-600 shrink-0" />
                {checkinDate ? format(checkinDate, "PPP") : <span>Select check-in date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
                selected={checkinDate}
                onSelect={handleCheckinDateChange}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Check-out Date
          </label>
          <Popover open={isCheckoutPopoverOpen} onOpenChange={setCheckoutPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={!checkinDate}
                className={cn(
                  "w-full justify-start text-left font-normal h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-sm",
                  !checkoutDate && "text-slate-400"
                )}
              >
                <CalendarIcon className="mr-2.5 h-4 w-4 text-teal-600 shrink-0" />
                {checkoutDate ? format(checkoutDate, "PPP") : <span>Select check-out date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={{ before: checkinDate ? addDays(checkinDate, 1) : new Date() }}
                selected={checkoutDate}
                onSelect={handleCheckoutDateChange}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Room Availability Result */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-3 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            <span>Checking availability...</span>
          </div>
        ) : foundRoom !== null ? (
          foundRoom > 0 ? (
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200/60 text-center">
                ✓ {foundRoom} room(s) available for these dates!
              </p>
              <Select onValueChange={handleRoomSelection}>
                <SelectTrigger className="w-full h-12 border-slate-200">
                  <SelectValue placeholder="Select quantity / room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Rooms</SelectLabel>
                    {Array.from({ length: foundRoom }, (_, i) => (
                      <SelectItem key={i} value={`${i + 1}`}>
                        {i + 1} Room{i > 0 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-center pt-2">
              ✕ No rooms available for these dates.
            </p>
          )
        ) : null}

        {/* Submit / Book Action Button */}
        <div className="pt-2">
          {foundRoom === null || foundRoom === 0 ? (
            <Button
              type="submit"
              disabled={!checkinDate || !checkoutDate || checkinDate >= checkoutDate || loading}
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-teal-600/10 text-sm"
            >
              Check Availability
            </Button>
          ) : (
            <Button
              asChild
              disabled={!selectedRoom}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-md text-sm"
            >
              <Link href={`/${roomId}/book${params}`}>Book Reservation</Link>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}