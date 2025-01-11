"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import ReviewList from "./ReviewList"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/utils/showtoast"

const FormSchema = z.object({
  message: z
    .string()
    .max(300, {
      message: "review must not be longer than 300 characters.",
    }),
})

export default function ReviewSection({room}) {
  const [isVerifyPurchase,setIsVerifyPurchase] = useState(false);
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
        message:""
    }
  })

  const session = useAuth();

  const {_id:roomId,reviews} = room;

  useEffect(()=>{
    async function isUserBookedThisRoom(){
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/verify-purchase-room/${session?.data?.id}/${roomId}`);
        if(!response.ok){
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        if(data.isVerifyPurchase){
          setIsVerifyPurchase(true)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    isUserBookedThisRoom()
 },[session?.data?.id,roomId])


 async function onSubmit(data) {
    const userId = session?.data.id
    const userData = {
     userId,
     roomId,
     message: data.message
    }
     try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/add`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userData)
        })
        if(response.status === 201){
            showToast("success", "review has been created succesfully");
            router.refresh();
            form.reset();
           }
     }catch(err){
        throw new Error(err)
     }
  }

  return (
   <>
    {isVerifyPurchase && (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Give a Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="give your feedback..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">send review</Button>
      </form>
    </Form>
    )}   
    
     
     <ReviewList reviews={reviews}/>
   </>
  )
}
