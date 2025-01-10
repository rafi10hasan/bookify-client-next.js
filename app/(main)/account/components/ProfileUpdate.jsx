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
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const ProfileSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("please enter a valid email"),
  image: z
    .any() // Allow any input
    .refine((file) => file instanceof File, {
      message: "Must be a valid file",
    })
    .refine(
      (file) => {
        const validFormats = ["png", "jpeg", "jpg"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        return validFormats.includes(fileExtension); // Check MIME type
      },
      {
        message: "Only PNG, JPG, or JPEG files are allowed",
      }
    )
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image must be smaller than 2MB",
    }),
});
export default function ProfileUpdate() {
  const { data: session, update } = useAuth();
  const [imagePreview, setImagePreview] = useState(session?.data?.user.image || "");
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      image: null,
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("image", data.image);
    try {
      const response = await fetch(`http://localhost:5000/profile/update/${session?.id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();
      if (result.updatedData) {
        const { firstname, lastname, image, email } = result.updatedData;
        const name = firstname.concat(" ", lastname);

        await update({ ...session, user: { ...session?.user, name, image, email } });
        // router.refresh()
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Form className="" {...form}>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="grid gap-2 grid-cols-12"
        >
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6 outline-none">
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
          </div>

          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    image(
                    <span className="text-deep-yellow">jpg , png or jpeg</span> and less than{" "}
                    <span className="text-deep-yellow">2mb</span> )
                  </FormLabel>

                  <FormControl>
                    <div className="grid grid-cols-6 gap-0">
                      {imagePreview && (
                        <div className={`${imagePreview ? "col-span-1 justify-self-center" : ""}`}>
                          {/* Display image preview */}
                          {imagePreview && (
                            <Image
                              src={imagePreview}
                              alt="Profile"
                              height={30}
                              width={30}
                              className="rounded-full w-[50px] h-[50px] object-cover"
                            />
                          )}
                        </div>
                      )}

                      <Input
                        className={`${
                          imagePreview
                            ? "col-span-5 font-semibold text-deep-cyan"
                            : "col-span-6 font-semibold text-deep-cyan"
                        }`}
                        type="file"
                        name="image"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImagePreview(URL.createObjectURL(file));
                            field.onChange(e.target.files[0]);
                          }
                          // Set preview
                          // Update the field value
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-12 w-[150px] mt-2">
            <Button className="w-full bg-midnight" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  update profile <Loader className="animate-spin" />
                </>
              ) : (
                "update profile"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Form>
  );
}
