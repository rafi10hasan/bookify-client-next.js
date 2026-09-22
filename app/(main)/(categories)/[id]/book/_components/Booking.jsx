"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format } from "date-fns";
import { Calendar, CreditCard, Mail, Phone, User, Loader2, BedDouble } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const BookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Valid phone number is required"),
  email: z.string().email("Please enter a valid email address"),
});

export default function Booking({
  checkin,
  checkout,
  room = 1,
  price = 0,
  title,
  roomId,
  userId,
}) {
  const [loading, setLoading] = useState(false);

  // Date parsing & price calculation
  const totalDays = Math.max(
    1,
    differenceInDays(new Date(checkout), new Date(checkin))
  );
  const calculatedTotalPrice = totalDays * price * room;

  const form = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      checkin: checkin ? format(new Date(checkin), "MMM dd, yyyy") : "",
      checkout: checkout ? format(new Date(checkout), "MMM dd, yyyy") : "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    const bookingInfo = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      userId,
      roomId,
      roomName: title,
      checkin,
      checkout,
      bookedRoom: room,
      bookingPrice: calculatedTotalPrice,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingInfo),
        }
      );

      const result = await response.json();
      if (result?.url) {
        window.location.href = result.url;
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Booking Checkout Error:", error);
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-sm border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-5">
        <CardTitle className="text-xl font-bold text-gray-900">
          Booking Details
        </CardTitle>
        <CardDescription className="text-xs text-gray-500">
          Confirm your contact information to proceed with payment
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="John Doe"
                          className="pl-9 h-10 text-sm focus-visible:ring-amber-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="+1 234 567 890"
                          className="pl-9 h-10 text-sm focus-visible:ring-amber-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="pl-9 h-10 text-sm focus-visible:ring-amber-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Check-In & Check-Out Readonly Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Check In
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          readOnly
                          className="pl-9 h-10 text-sm bg-gray-50/80 text-gray-600 cursor-not-allowed border-gray-200"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Check Out
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          readOnly
                          className="pl-9 h-10 text-sm bg-gray-50/80 text-gray-600 cursor-not-allowed border-gray-200"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Price Breakdown Summary Box */}
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 space-y-2.5 text-sm">
              <div className="flex justify-between items-center text-gray-600">
                <span>Per Night</span>
                <span className="font-semibold text-gray-900">${price}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Duration</span>
                <span className="font-semibold text-gray-900">
                  {totalDays} {totalDays === 1 ? "Night" : "Nights"}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-gray-400" />
                  Rooms
                </span>
                <span className="font-semibold text-gray-900">
                  {room} {room === 1 ? "Room" : "Rooms"}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-2.5 mt-2 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Price</span>
                <span className="text-xl font-extrabold text-amber-600">
                  ${calculatedTotalPrice}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl transition-all shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Redirecting to Checkout...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Book & Pay Now
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}