"use client";

import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { credentialLogin } from "@/app/actions";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { getSession } from "next-auth/react";

export default function SignInForm() {
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

const onSubmit = async (data) => {
  try {
    setError("");
    const response = await credentialLogin(data);

    if (response?.error) {
      setError(response.error);
      return;
    }

    // Client side e fresh session read kora
    const session = await getSession();

    if (session?.user?.role === "admin") {
      router.push("/dashboard/overview");
    } else {
      router.push("/");
    }

    router.refresh();
  } catch (err) {
    setError("Invalid email or password");
  }
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Error Message */}
        {error && (
          <p className="text-xs font-medium text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg h-11 mt-2 transition-all shadow-md shadow-blue-600/20"
        >
          Sign in
        </Button>

        {/* Register Link */}
        <p className="text-sm text-slate-400 text-left pt-2">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}