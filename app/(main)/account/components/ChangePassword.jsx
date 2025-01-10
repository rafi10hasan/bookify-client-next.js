"use client";
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
 
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Croissant, CrossIcon, EyeIcon, EyeOffIcon, Loader, SquareX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import delay from "@/utils/delay";

const emailSchema = z.object({
  email: z.string().email("please enter a valid email"),
 
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, {
        message:
          "Password must be at least 6 characters",
      }), 
    confirmPassword: z.string(),
  
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });

export default function ChangePassword() {
  const {data:session} = useAuth()
  const [isEmailVerified,setEmailVerified] = useState(false);
  const [isOtpVerified,setIsOtpVerified] = useState(false);
  const [otpValue,setOtpValue] = useState("");
  const [loading,setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {toast} = useToast()
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword:""
    },
  });

  const {errors:emailError,isSubmitting:isEmailSubmitting} = emailForm.formState;
  const {errors:passError,isSubmitting:isPasswordSubmitting} = passwordForm.formState;


  async function onEmailSubmit(data) {
    await new Promise((resolve)=>setTimeout(()=>{resolve()},1000))
     try {
       const response = await fetch('http://localhost:5000/verify/email',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
       })
       if(response.status === 200){
        const data = await response.json();
        if(data.success){
          setEmailVerified(true);
        }
       }
       else{
        toast({
          variant: "error",
          description: (
            <div className="flex items-center">
            <SquareX className="mr-2" />
            <span>user not found</span>
          </div>
          ),
          })
       }
     } catch (error) {
        throw new Error(error)
     }
  }
 
  async function handleVerifyOtp(){
   
      try {
        setLoading(true)
        await delay(2000)
        const response = await fetch(`http://localhost:5000/verify/OTP/${session.id}`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({otp:Number(otpValue)})
        });
        if(response.status === 200){
          const data = await response.json();
          if(data.success){
            setIsOtpVerified(true);
            setLoading(false)
          }
        }
        else{
          toast({
            variant: "error",
            description: (
              <div className="flex items-center">
              <SquareX className="mr-2" />
              <span>Invalid OTP</span>
            </div>
            ),
            })
          setIsOtpVerified(false);
          setLoading(false)
        }
      } catch (error) {
        throw new Error(error)
      }
  }
  
  async function onPasswordSubmit(data){
    const passwordData = {
      password: data.password
    }
        try {
          const response = await fetch(`http://localhost:5000/profile/update-password/${session.id}`,{
            method:"PUT",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(passwordData)
          }) 
          const data = await response.json();
          if(data.success){
            toast({
              variant: "success",
              description: (
                <div className="flex items-center">
                <CircleCheck className="mr-2" aria-label="Success" />
                <span>password updated successfully</span>
              </div>
              ),
              })
              setEmailVerified(false);
              setIsOtpVerified(false)
          }
        } catch (error) {
           throw new Error(error)
        }
  }
  return (
    <div>
      <div className="">
        {!isEmailVerified && (
           <Form {...emailForm}>
           <CardContent>
             <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="">
 
               <div className="outline-none">
                 <FormField
                   control={emailForm.control}
                   name="email"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Email</FormLabel>
                       <FormControl>
                         <Input type="email" placeholder="Enter your email" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>
 
               <div className="w-[150px] mt-4">
                 <Button className="w-full bg-midnight" type="submit" disabled={isEmailSubmitting}>
                 {isEmailSubmitting ? (<>
                 verify email<Loader className="animate-spin"/>
               </>) : 'send email'}
                 </Button>
               </div>
             </form>
           </CardContent>
           </Form>
 
        )}
       
        {
          isEmailVerified && !isOtpVerified && (
            <div className="space-y-2 mx-6">
               <p className="text-deep-yellow font-semibold">Check your email! i have send 4 digit otp in your gmail account..</p>
              <div className="flex gap-2">
            <InputOTP
              maxLength={4}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <div className="w-[150px] mt-4">
                  <Button onClick={handleVerifyOtp} className="w-full bg-midnight" type="submit" disabled={otpValue.length<=3}>
                  {loading ? (<>
                  VERIFY OTP <Loader className="animate-spin"/>
                </>) : 'VERIFY OTP'}
                  </Button>
                </div>
            </div>
            <div className="text-sm">
              {otpValue === "" ? (
                <>Give Your OTP Value.</>
              ) : (
                <>You entered: {otpValue}</>
              )}
            </div>
          </div>
          )
        }

        {
          isOtpVerified && (
            <Form {...passwordForm}>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="">
              <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <Button
                      variant="text"
                      size="md"
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-2 top-2"
                      aria-label="Toggle password visibility"
                    >
                      {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </div>
                </FormControl>
                {/* <FormMessage>{passwordForm.errors.password?.message}</FormMessage> */}
              </FormItem>
            )}
          />
          {/* password field */}
          <FormField
            control={passwordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirm Password</FormLabel>
                <FormControl>
                  <div className="flex relative">
                    <Input
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <Button
                      variant="text"
                      size="md"
                      type="button"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      className="absolute right-2 top-2"
                      aria-label="Toggle password visibility"
                    >
                      {confirmPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </div>
                </FormControl>
                {/* <FormMessage>{passwordForm.errors.confirmPassword?.message}</FormMessage> */}
              </FormItem>
            )}
          />
             
  
                <div className="w-[150px] mt-4">
                  <Button className="w-full bg-midnight" type="submit" disabled={isPasswordSubmitting}>
                  {isPasswordSubmitting ? (<>
                  change password <Loader className="animate-spin"/>
                </>) : 'change password'}
                  </Button>
                </div>
              </form>
            </CardContent>
            </Form>
  
          )
        }

      </div>
    </div>
  );
}
