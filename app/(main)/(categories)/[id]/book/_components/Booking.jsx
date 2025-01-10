"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";

const BookingSchema = z.object({
  name: z.string().min(2, "First name must be at least 2 characters"),
  phone: z.string({ message: "phone number is required" }),
  email: z.string().email("please enter a valid email"),
});

export default function Booking({ checkin, checkout, room, price, title, roomId }) {
  const session = useAuth();
  // Log the parsed dates to check format
  const totalDays = differenceInDays(new Date(checkout), new Date(checkin));
  const totalPrice = `${totalDays * price * room}$`;
  const form = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      checkin: checkin,
      checkout: checkout,
      
    },
  });
  async function onSubmit(data) {
    const bookingInfo ={
      name: data.name,
      phone: data.phone,
      email: data.email,
      userId: session?.data?.id,
      roomId:roomId,
      roomName:title,
      checkin: checkin,
      checkout: checkout,
      bookedRoom: room,
      bookingPrice: (totalDays * price) * room,
    }
    try {
      const response = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingInfo),
      });
      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Checkout
  } catch (error) {
     throw new Error(error)
  }
  }

  return (
    <div>
      <Form {...form}>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phone</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 outline-none">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>check in</FormLabel>
                    <FormControl>
                      <Input readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="checkout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>checkout</FormLabel>
                    <FormControl>
                      <Input readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12">
              <h1>
                Per Night : <span className="font-semibold text-deep-cyan">{price} $</span>
              </h1>
              <h1>
                Nights : <span className="font-semibold text-deep-cyan">{totalDays} days</span>
              </h1>
              <h1>
                Total Room Booked :{" "}
                <span className="font-semibold text-deep-cyan">{room} room</span>
              </h1>
              <h1>
                Sub Total: <span className="font-semibold text-deep-cyan">{totalPrice}</span>
              </h1>

              <h1></h1>
            </div>
            <div className="col-span-12 w-full mt-2 ">
              <Button className="w-full bg-midnight" type="submit">
                book now
              </Button>
            </div>
          </form>
        </CardContent>
      </Form>
    </div>
  );
}
