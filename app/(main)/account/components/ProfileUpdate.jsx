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
import { Check, Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional()
    .or(z.literal("")),

  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional()
    .or(z.literal("")),

  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),

  image: z.any().optional(),
});

export default function ProfileUpdate() {
  const { data: session, update } = useAuth();
  const [imagePreview, setImagePreview] = useState("");
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      image: null,
    },
  });

  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name ? session.user.name.split(" ") : ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      form.reset({
        firstname: firstName,
        lastname: lastName,
        email: session.user.email || "",
        image: null,
      });

      if (session.user.image) {
        setImagePreview(session.user.image);
      }
    }
  }, [session, form]);

  const { isSubmitting } = form.formState;

  async function onSubmit(data) {
    const formData = new FormData();
    if (data.firstname) formData.append("firstname", data.firstname);
    if (data.lastname) formData.append("lastname", data.lastname);
    if (data.email) formData.append("email", data.email);
    if (data.image) formData.append("image", data.image);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/update/${session?.id}`,
        {
          method: "PUT",
          body: formData,
        },
      );
      const result = await response.json();
      console.log("update",result)
      if (result.data) {
        const { firstname, lastname, image, email } = result.data;
        const name = `${firstname} ${lastname}`.trim();
        await update({ ...session, user: { ...session?.user, name, image, email } });
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <Check className="mr-2" />
              <span>{result.message}</span>
            </div>
          ),
        });
      }
    } catch (err) {
      toast({
        variant: "error",
        description: (
          <div className="flex items-center">
            <X className="mr-2" />
            <span>Profile update Failed</span>
          </div>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="rounded-xl border-slate-200 focus:ring-slate-400"
                    {...field}
                  />
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
                <FormLabel className="text-slate-700 font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    className="rounded-xl border-slate-200 focus:ring-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    readOnly
                    placeholder="john.doe@example.com"
                    className="rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profile Image Input */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="text-slate-700 font-medium">Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-5 p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-white flex-shrink-0">
                      {imagePreview ? (
                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImagePreview(URL.createObjectURL(file));
                            field.onChange(file);
                          }
                        }}
                      />
                      <p className="text-[11px] text-slate-400 mt-1">PNG, JPG or JPEG (Max 2MB)</p>
                    </div>
                  </div>
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
              Updating...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
