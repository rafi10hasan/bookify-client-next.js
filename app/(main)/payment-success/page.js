import { Button } from "@/components/ui/button";
import { CircleCheck, MessageCircleWarning } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

const Success = async ({ searchParams: { session_id} }) => {

    if (!session_id)
        throw new Error(
            "Please provide a valid session id that starts with cs_"
        );

    const userSession = await auth();

    if (!userSession?.user?.email) {
        redirect("/login");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment-intent`,{
        method:"POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({session_id})
    })
    const checkoutSession = await response.json();
    const {success} = checkoutSession
    

    return (
        <div className="h-full w-full mt-10 mb-10 flex-1 flex flex-col items-center justify-center">
            <Card className="flex flex-col items-center gap-6 max-w-[600px] text-center p-4">
                {success ? (
                    <>
                        <CircleCheck className="w-16 h-16 mt-6 bg-green-600 rounded-full p-0 text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl">
                            Congratulations, <strong className="text-deep-yellow font-semibold">{userSession?.user?.name}</strong>! Your booking has been Successfully added 
                        </h1>
                        <div className="flex items-center gap-3">
                    <Button asChild variant="outline" className="bg-light-yellow font-semibold" size="sm">
                        <Link href={`/my-bookings`}>
                            see your all bookings
                        </Link>
                    </Button>
                </div>
                    </>
                ) : <>
                     <MessageCircleWarning className="w-16 h-16 mt-6 bg-red-600 rounded-full p-0 text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl">
                            your payment is failed
                        </h1>
                
                </>}
               
            </Card>
        </div>
    );
};
export default Success;
