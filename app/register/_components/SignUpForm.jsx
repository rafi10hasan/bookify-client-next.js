"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const registrationSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpForm() {
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>User has been created successfully</span>
            </div>
          ),
        });
        router.push("/login");
      } else {
        toast({
          variant: "warning",
          description: (
            <div className="flex items-center">
              <SquareX className="mr-2" />
              <span>User already exists</span>
            </div>
          ),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name - Single Line */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-200">
                First name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  className="bg-[#334155]/60 border-slate-600/80 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-11 w-full"
                />
              </FormControl>
              <FormMessage className="text-xs text-rose-400" />
            </FormItem>
          )}
        />

        {/* Last Name - Single Line */}
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-200">
                Last name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  {...field}
                  className="bg-[#334155]/60 border-slate-600/80 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-11 w-full"
                />
              </FormControl>
              <FormMessage className="text-xs text-rose-400" />
            </FormItem>
          )}
        />

        {/* Email Field - Single Line */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-200">
                Your email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  {...field}
                  className="bg-[#334155]/60 border-slate-600/80 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-11 w-full"
                />
              </FormControl>
              <FormMessage className="text-xs text-rose-400" />
            </FormItem>
          )}
        />

        {/* Password Field - Single Line */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-200">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="bg-[#334155]/60 border-slate-600/80 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-11 pr-10 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {passwordVisible ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeOffIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-rose-400" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg h-11 mt-4 transition-all shadow-md shadow-blue-600/20"
        >
          Create an account
        </Button>

        {/* Login Link */}
        <p className="text-sm text-slate-400 text-left pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </Form>
  );
}