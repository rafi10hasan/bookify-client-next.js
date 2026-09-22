'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote, User } from "lucide-react";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section className="py-16 bg-gray-50/50 dark:bg-[#0b1727]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider block mb-2">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews?.map((review, index) => {
                const rating = review?.rating || 5;
                
                return (
                  /* lg:basis-1/3 এর মাধ্যমে লার্জ স্ক্রিনে একসাথে ৩টি করে কার্ড দেখাবে */
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white dark:bg-[#162231]">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                          
                          <div>
                            {/* Top Bar: Rating & Quote Icon */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Quote className="w-7 h-7 text-amber-500/20 rotate-180" />
                            </div>

                            {/* Message */}
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic mb-6 line-clamp-4">
                              {review?.message}
                            </p>
                          </div>

                          {/* User Details Footer */}
                          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                            {review?.userId?.image ? (
                              <Image
                                src={review.userId.image}
                                alt={review?.userId?.firstname || "User"}
                                className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/20"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                                <User className="w-5 h-5" />
                              </div>
                            )}

                            <div>
                              <h5 className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
                                {review?.userId?.firstname
                                  ? `${review?.userId?.firstname} ${review?.userId?.lastname || ""}`
                                  : "Verified Guest"}
                              </h5>
                              <p className="text-xs text-gray-400">Happy Guest</p>
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden sm:flex -left-5 lg:-left-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 transition-colors shadow-md" />
            <CarouselNext className="hidden sm:flex -right-5 lg:-right-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 transition-colors shadow-md" />
          </Carousel>
        </div>

      </div>
    </section>
  );
}