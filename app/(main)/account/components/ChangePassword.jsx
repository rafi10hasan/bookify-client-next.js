"use client";

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
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password and Confirm password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function ChangePassword() {
  const { data: session } = useAuth();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/change-password/${session?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          }),
        },
      );

      const result = await response.json();
      console.log(result, response);

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || "Password update failed!";
        toast({
          variant: "error",
          description: (
            <div className="flex items-center">
              <X className="mr-2" />
              <span>{errorMessage}</span>
            </div>
          ),
        });
        return;
      }

      form.reset();
      toast({
        variant: "success",
        description: (
          <div className="flex items-center">
            <Check className="mr-2" />
            <span>{result.message}</span>
          </div>
        ),
      });
    } catch (err) {
      const errorMessage = result?.message || result?.error || "Password update failed!";
      toast({
        variant: "error",
        description: (
          <div className="flex items-center">
            <X className="mr-2" />
            <span>{errorMessage}</span>
          </div>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        <div className="space-y-4">
          {/* Old Password */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">Old Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    className="rounded-xl border-slate-200 focus:ring-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="rounded-xl border-slate-200 focus:ring-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="rounded-xl border-slate-200 focus:ring-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-2.5 font-medium shadow-sm transition-all"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating Password...
            </span>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
