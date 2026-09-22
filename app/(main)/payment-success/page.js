import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, ArrowRight, Home } from "lucide-react";

const Success = async ({ searchParams }) => {
  
  const resolvedSearchParams = await searchParams;
  const session_id = resolvedSearchParams?.session_id;

  if (!session_id) {
    throw new Error("Please provide a valid session id that starts with cs_");
  }

  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  let success = false;
  let checkoutSession = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ session_id }),
        cache: "no-store",
      }
    );
    checkoutSession = await response.json();
    success = checkoutSession?.success;
  } catch (error) {
    console.error("Payment verification failed:", error);
    success = false;
  }

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg border border-gray-200 shadow-lg rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          {success ? (
            <>
              {/* Success Icon Animation Badge */}
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Booking Confirmed!
                </h1>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                  Congratulations,{" "}
                  <span className="font-bold text-gray-900">
                    {userSession?.user?.name || "Guest"}
                  </span>
                  ! Your room booking has been successfully processed.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="w-full bg-gray-50 border border-gray-200/80 rounded-xl p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Payment Status</span>
                  <span className="font-bold text-emerald-600 uppercase tracking-wider bg-emerald-100/60 px-2 py-0.5 rounded-md">
                    Completed
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600 overflow-hidden">
                  <span className="font-medium shrink-0">Session Reference</span>
                  <span className="font-mono text-gray-800 truncate max-w-[180px] sm:max-w-[240px]">
                    {session_id}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-11 rounded-xl transition-all shadow-sm"
                >
                  <Link href="/my-bookings" className="flex items-center justify-center">
                    View My Bookings
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-300 font-semibold h-11 rounded-xl hover:bg-gray-50 text-gray-700"
                >
                  <Link href="/" className="flex items-center justify-center">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Failure Icon Badge */}
              <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shadow-inner">
                <AlertTriangle className="w-10 h-10 stroke-[2.5]" />
              </div>

              {/* Failure Heading */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Payment Failed
                </h1>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                  We couldnt process your payment. Please try again or contact support if the issue persists.
                </p>
              </div>

              {/* Failure Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                <Button
                  asChild
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold h-11 rounded-xl transition-all"
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;