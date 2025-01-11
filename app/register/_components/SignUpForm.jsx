"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleCheckIcon, EyeIcon, EyeOffIcon, SquareX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Define the Zod schema
const registrationSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpForm() {
  const  {toast} = useToast();
  const [passwordVisible,setPasswordVisible] = useState(false)
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async(data) => {
    try{
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,{
        method: "POST",
        headers:{
             "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

       })
       if(response.status === 201){
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>user has been created successfully</span>
            </div>
          ),
        })
        router.push('/login');
       }
       else{
        toast({
          variant: "warning",
          description: (
            <div className="flex items-center">
              <SquareX className="mr-2" />
              <span>user already exist</span>
            </div>
          ),
        })
       }
       

    }catch(err){
      throw new Error(err)
    }
  };

  return (
    <div>
        <Form {...form}>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
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

              <FormField
                control={form.control}
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
                      className="absolute right-2 top-3"
                      aria-label="Toggle password visibility"
                    >
                      {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </div>
        
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full mt-2">
                <Button className="w-full bg-midnight" type="submit">
                  create an account
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline font-semibold text-deep-cyan">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Form>
      
    </div>
  );
}
