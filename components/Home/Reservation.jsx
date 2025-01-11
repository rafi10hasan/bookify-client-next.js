"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Reservation({modify}) {
  const router = useRouter();
  const form = useForm();
  
  let params = ""
  function onReservationData(data){
     const checkinDate = format(data.checkin,"MM/dd/yy")
     const checkoutDate = format(data.checkout,"MM/dd/yy")
     const adults = Number(data.adults);
     const children = Number(data.children); 
     params = `?checkin=${checkinDate}&checkout=${checkoutDate}&adults=${adults}&children=${children}&page=1&limit=5`;
     if (router.asPath !== `/searchrooms${params}`) {
      router.push(`/searchrooms${params}`);  // This ensures that only the new URL will trigger the re-fetch
    }
  }
  return (
    <div 
    className=
      "relative flex justify-center items-center md:shrink-0 w-full"
    >
      <Form {...form} className="relative flex justify-center items-center md:shrink-0 w-full">
        <form
          className={`
          grid grid-cols-1 md:grid-cols-12
          gap-6 container w-[90vw] md:w-[86vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[68vw] ${modify ? 'mt-10' : 'md:-mt-40 z-10'} rounded-md bg-deep-cyan p-6 
        `}
        onSubmit={form.handleSubmit(onReservationData)}
        >
          {/* Check-in Field */}
          <FormField
            control={form.control}
            name="checkin"
            className="relative"
            render={({ field }) => (
        
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                <FormLabel className="text-white">*Check in</FormLabel>
                <FormControl className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value, "PPP") : <span>Check-in date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-auto flex-col space-y-2 p-2 "
                    >
                      <Calendar
                        mode="single"
                        disabled={{ before: new Date() }}
                        selected={field.value}
                        onSelect={(date)=>(
                          field.onChange(date),
                          form.setValue('checkout','')
                        )} // Use updated handler
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Check-out Field */}
          <FormField
            control={form.control}
            name="checkout"
            className="relative"
            render={({ field }) => (
        
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                <FormLabel className="text-white">*Check out</FormLabel>
                <FormControl className="relative">
                  <Popover
                   
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value, "PPP") : <span>Check-in date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-auto flex-col space-y-2 p-2 "
                    >
                      <Calendar
                        mode="single"
                        disabled={{ before: form.getValues('checkin') ? addDays(form.getValues('checkin'), 1) : new Date() }}
                        selected={field.value}
                        onSelect={(date)=>(
                          field.onChange(date)
                        )} // Use updated handler
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Adults Field */}
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-2">
                <FormLabel className="text-white">Adults</FormLabel>
                <FormControl>
                  <Select onValueChange={(val)=>(field.onChange(val))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select adults" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>select adults</SelectLabel>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Children Field */}
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-2">
                <FormLabel className="text-white">Children</FormLabel>
                <FormControl>
                  <Select className="" onValueChange={(val)=>(field.onChange(val))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select children" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>select children</SelectLabel>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="col-span-12 w-full md:col-span-12 lg:col-span-2 flex justify-start mt-8">
            {
              modify ?  <Button
              type="submit"
              disabled={!['checkin', 'checkout', 'adults', 'children'].every(field => form.getValues(field))}

              className="w-full text-black font-semibold bg-light-yellow hover:bg-midnight hover:text-white tracking-wide"
            >
              modify search
            </Button> :  <Button
              type="submit"
              disabled={!['checkin', 'checkout', 'adults', 'children'].every(field => form.getValues(field))}

              className="w-full text-black font-semibold bg-light-yellow hover:bg-midnight hover:text-white tracking-wide"
            >
              search room
            </Button>
            }
           
          </div>
        </form>
      </Form>
    </div>
  );
}
