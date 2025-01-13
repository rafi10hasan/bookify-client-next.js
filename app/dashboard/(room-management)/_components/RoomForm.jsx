"use client";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { processGallery } from "@/utils/process-gallery-image";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RoomSchema } from "./RoomSchema";

export default function RoomForm({ initialData, roomId, amenitiesData }) {
  const [imagePreview, setImagePreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState(amenitiesData || []);
  const fileInputRef = useRef();
  const { toast } = useToast();
   
  console.log(selectedAmenities)
  console.log(amenitiesData)
  const form = useForm({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      title: initialData?.title || "",
      size: initialData?.size.toString() || "1",
      price: initialData?.price.toString() || "1",
      description: initialData?.description || "",
      adults: initialData?.Adults.toString() || "1",
      children: initialData?.children.toString() || "0",
      bedType: initialData?.bed_type.toString() || "",
      roomType: initialData?.room_type || "",
      image: initialData?.image || null,
      gallery: galleryPreviews || [],
      accommodation: initialData?.accommodation.toString() || "1",
      meal: initialData?.meal.toString() || "",
      category: initialData?.categoryId.title || "",
      view: initialData?.view.toString() || "",
      amenities: "",
    },
  });
  const { errors, isSubmitting } = form.formState;
  function handleChange(val) {
    setSelectedAmenities((prev) => {
      if (!prev.includes(val)) {
        return [...prev, val];
      }
      return prev;
    });
  }

  function handleGalleryChange(e, field) {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const galleryImages = galleryPreviews.concat(previews);
    setGalleryPreviews(galleryImages);

    const imageFiles = galleryImages.map((file) => file.file);
    field.onChange(imageFiles);
    // Update the field value with selected files
  }

  function handleDeleteGalleryImg(field, index) {
    const files = galleryPreviews.filter((_, i) => i !== index);
    setGalleryPreviews(files);
    const imageFiles = files.map((file) => file.file);

    field.onChange(imageFiles);
    fileInputRef.current.value = "";
  }

  function handleDeleteItems(item) {
    setSelectedAmenities((prev) => prev.filter((p) => p !== item));
  }

  // useEffect(() => {
  //   setSelectedAmenities(amenitiesData);
  // }, [amenitiesData]);

  useEffect(() => {
    async function getGalleryFiles() {
      try {
        const files = await processGallery(initialData?.gallery);
        const previewFiles = files.map((file) => {
          return {
            file,
            preview: URL.createObjectURL(file),
          };
        });
        setGalleryPreviews(previewFiles);
      } catch (error) {
        throw new Error(error);
      }
    }
    getGalleryFiles();
  }, [initialData?.gallery]);

  useEffect(() => {
    // Clean up object URLs on unmount
    return () => {
      galleryPreviews.forEach((preview) => URL.revokeObjectURL(preview.preview));
    };
  }, [galleryPreviews]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/sub`);
        const data = await response.json();
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getAmenities() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/amenity`);
        const data = await response.json();
        if (data) {
          setAmenities(data);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    getAmenities();
  }, []);

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("size", data.size);
    formData.append("price", data.price);
    formData.append("view", data.view);
    formData.append("adults", data.adults); // Convert array to string
    formData.append("bedType", data.bedType);
    formData.append("category", data.category);
    formData.append("accommodation", data.accommodation);
    formData.append("children", data.children);
    formData.append("description", data.description);
    formData.append("meal", data.meal);
    formData.append("amenities", JSON.stringify(selectedAmenities || data.amenities));
    formData.append("roomType", data.roomType);
    if (roomId) {
      formData.append("roomId", roomId);
    }

    // Add files
    if (data.image instanceof File) {
      // If the image is a File (newly uploaded from the input)
      formData.append("image", data.image);
    } else if (initialData?.image) {
      // If the initial image is a URL (existing image, no change needed)
      formData.append("image", initialData?.image); // Send the URL as-is
    }

    // Handle gallery uploads (if any)

    if (data.gallery.length) {
      data.gallery.forEach((file) => {
        formData.append("gallery", file);
      });
    } else if (galleryPreviews.length) {
      galleryPreviews.forEach((file) => {
        formData.append("gallery", file.file);
      });
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/add`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              {
                initialData ? (<span>room updated succesfully</span>) : (<span>room added succesfully</span>)
              }
              
            </div>
          ),
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="w-full mb-2">
      <Form {...form}>
        <Card className="py-2">
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-2">
              <div className="max-[585px]:col-span-12 col-span-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your title" {...field} />
                      </FormControl>
                      <FormMessage>{errors?.title?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-6 col-span-3">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>size</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter room size"
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-6 col-span-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="enter room price"
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                          }
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {errors?.price?.message}
              <div className="col-span-12 outline-none">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Textarea type="text" placeholder="Enter your room summary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-6 col-span-4">
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adults</FormLabel>
                      <FormControl>
                        <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select adults" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>select adults</SelectLabel>
                              {Array.from(["1", "2", "3", "4", "5"], (item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-6 col-span-4">
                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children</FormLabel>
                      <FormControl>
                        <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select children" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>select children</SelectLabel>
                              {Array.from(["0", "1", "2", "3", "4", "5"], (item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-12 col-span-4">
                <FormField
                  control={form.control}
                  name="view"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>view</FormLabel>
                      <FormControl>
                        <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>select view</SelectLabel>
                              {Array.from(
                                ["swimming pool", "beach", "beach&ocean"],
                                (item, index) => (
                                  <SelectItem key={index} value={item}>
                                    {item}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-12 col-span-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>category</FormLabel>
                      <FormControl>
                        <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>select category</SelectLabel>
                              {categories?.map((item) => (
                                <SelectItem key={item._id} value={item.title}>
                                  {item.title}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-12 col-span-4">
                <FormField
                  control={form.control}
                  name="bedType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bed Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Bed Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>select Bed Type</SelectLabel>
                              {Array.from(["single", "double"], (item, index) => (
                                <SelectItem key={index} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-12 col-span-4">
                <FormField
                  control={form.control}
                  name="accommodation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>room accommodation</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="enter accommodation number"
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                          }
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {errors?.accommodation?.message}
              <div className="max-[585px]:col-span-12 col-span-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>thumbnail</FormLabel>
                      <FormControl>
                        <div className="">
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
                          {imagePreview || field.value ? (
                            <div className="mt-2">
                              <Image
                                src={
                                  imagePreview ||
                                  (typeof field.value === "string" ? field.value : "")
                                } // Use preview or existing image URL
                                alt="Thumbnail Preview"
                                height={200}
                                width={500}
                                className="rounded-md object-cover"
                              />
                            </div>
                          ) : null}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-12 col-span-6">
                <FormField
                  control={form.control}
                  name="gallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gallery</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          <Input
                            type="file"
                            name="gallery"
                            multiple
                            ref={fileInputRef}
                            onChange={(e) => handleGalleryChange(e, field)}
                          />
                          {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {galleryPreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                  <Image
                                    src={preview.preview}
                                    alt={`Preview ${index + 1}`}
                                    height={200}
                                    width={200}
                                    className="rounded-md object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGalleryImg(field, index)}
                                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md  hover:text"
                                  >
                                    <X className="text-red-600 group-hover:text-white" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>amenities</FormLabel>
                      <FormControl>
                        <Select
                            value={field.value}
                            onValueChange={(val) => {
                                console.log(val)
                                field.onChange(val); 
                                handleChange(val); 
                              
                            }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="amenities" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {amenities.map((item) => (
                                <SelectItem key={item._id} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  {selectedAmenities?.length
                    ? selectedAmenities.map((item, index) => (
                        <Badge variant="superb" className="mr-2" key={index}>
                          {item}{" "}
                          <button onClick={() => handleDeleteItems(item)} className="ml-2">
                            {" "}
                            X{" "}
                          </button>
                        </Badge>
                      ))
                    : null}
                </div>
              </div>

              <div className="col-span-12 text-red-600">{errors?.amenities?.message}</div>

              <div className="max-[585px]:col-span-12 col-span-8">
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>select Room Type</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="enter room type" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="max-[585px]:col-span-12 col-span-4">
                <FormField
                  control={form.control}
                  name="meal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>meal</FormLabel>
                      <FormControl>
                        <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="meal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>meal</SelectLabel>
                              {Array.from(
                                ["no meal", "breakfast", "lunch", "dinner"],
                                (item, index) => (
                                  <SelectItem key={index} value={item}>
                                    {item}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 w-full mt-2 ">
                {roomId ? (
                  <Button className="w-full bg-midnight" type="submit">
                    Edit Room
                  </Button>
                ) : (
                  <Button className="w-full bg-midnight" type="submit">
                    Add Room
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
