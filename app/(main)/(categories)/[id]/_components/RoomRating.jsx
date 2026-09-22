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
import { Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RatingBar } from "./RatingBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function RoomRating({ room }) {
  const { ratings = [], title, _id } = room;
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [isVerifyPurchase, setIsVerifyPurchase] = useState(false);
  const [open, setOpen] = useState(false);
  const session = useAuth();
  const router = useRouter();

  const totalRatings = ratings?.length;
  const avgRating = totalRatings
    ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings
    : 0;

  const calculatePercentage = (ratingValue) => {
    const count = ratings?.filter((item) => item.rating === ratingValue).length;
    return totalRatings ? (count / totalRatings) * 100 : 0;
  };

  const getUserRatingByRoom = useCallback(async () => {
    try {
      if (session?.data && _id) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating/${session?.data?.id}/${_id}`);
        if (!response.ok) return;
        const data = await response.json();
        setCurrentRating(data.rating);
      }
    } catch (error) {
      console.error(error);
    }
  }, [_id, session]);

  useEffect(() => {
    async function isUserBookedThisRoom() {
      try {
        if (session?.data && _id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/booking/verify-purchase-room/${session?.data?.id}/${_id}`
          );
          const data = await response.json();
          if (data.isVerifyPurchase) {
            setIsVerifyPurchase(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    isUserBookedThisRoom();
  }, [session, _id]);

  useEffect(() => {
    getUserRatingByRoom();
  }, [getUserRatingByRoom]);

  async function handleSubmit(e) {
    e.preventDefault();
    const userId = session?.data?.id;
    const data = { roomId: _id, userId, rating };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setOpen(false);
        getUserRatingByRoom();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Guest Ratings & Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Score Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
            {avgRating.toFixed(1)}
          </span>
          <div className="flex items-center space-x-1 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(avgRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            Based on {totalRatings} verified {totalRatings === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingBar
              key={star}
              label={`${star} Stars`}
              percentage={calculatePercentage(star)}
            />
          ))}
        </div>
      </div>

      {/* Give Rating Action */}
      {isVerifyPurchase && (
        <div className="pt-2 flex items-center justify-between border-t border-gray-200/60">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Your rating:</span>
            <span className="font-bold text-gray-900 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
              {currentRating || 0} / 5
            </span>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg">
                <Star className="w-4 h-4 mr-2 fill-white" />
                Rate This Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-center">Rate Your Experience</DialogTitle>
                <DialogDescription className="text-center">{title}</DialogDescription>
              </DialogHeader>

              <div className="flex justify-center gap-2 py-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-8 h-8 cursor-pointer transition-all ${
                      (hover || rating) > index
                        ? "fill-amber-400 text-amber-400 scale-110"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>

              <DialogFooter>
                <form onSubmit={handleSubmit} className="w-full">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Submit Rating
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}