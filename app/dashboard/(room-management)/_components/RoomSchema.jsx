import { z } from "zod";


export const RoomSchema = z.object({
    title: z.string().min(2, "Title is required and must have at least 2 characters"),
    size: z.string().min(1, "Room size is required and must be a positive number"),
    price: z.string("Price is required and must be a positive number"),
    description: z.string().min(10, "Description is required and must have at least 10 characters"),
    adults: z.string("Number of adults is required and must be at least 1"),
    children: z.string("Number of children is required and must be 0 or more"),
    bedType: z.string("Bed type is required"),
    roomType: z.string("Room type is required"),
    
    // Image validation with custom refinements
    image: z
    .any()
    .refine((file) => file instanceof File || typeof file === 'string', {
      message: "Must be a valid file or URL", // Allowing URL case for image
    })
    .refine(
      (file) => {
        if (file instanceof File) {
          const validFormats = ["png", "jpeg", "jpg"];
          const fileExtension = file.name.split(".").pop()?.toLowerCase();
          return validFormats.includes(fileExtension); // Check extension for files
        }
        return true; // Allow URL if it's not a file
      },
      {
        message: "Only PNG, JPG, or JPEG files are allowed", // Error message
      }
    )
    .refine(
      (file) => {
        if (file instanceof File) {
          return file.size <= 2 * 1024 * 1024; // Validate size for files only
        }
        return true; // No size check for URL
      },
      {
        message: "Image must be smaller than 2MB",
      }
    ),

  gallery: z
    .array(
      z
        .any()
        .refine((file) => file instanceof File || typeof file === 'string', { message: "Must be a valid file" })
        .refine(
          (file) => {
            if(file instanceof File){
              const validFormats = ["png", "jpeg", "jpg"];
              const fileExtension = file?.name.split(".").pop()?.toLowerCase();
              return validFormats.includes(fileExtension); // Check file extension
            }
            return true
          },
          {
            message: "Only PNG, JPG, or JPEG files are allowed in the gallery",
          }
        )
        .refine(
          (file) => {
            if (file instanceof File) {
              return file.size <= 2 * 1024 * 1024; // Validate size for files only
            }
            return true; // No size check for URL
          },
          {
            message: "each Image must be smaller than 2MB",
          }
        ),
    )
    .max(5, "Gallery can only have up to 5 images"), // Optional: limit the number of images
  
    accommodation: z.string("accommodation is required"),
    meal: z.string("Each meal must have a valid name"),
    category: z.string("Category is required"),
    view: z.string("View is required"),
    amenities: z.string("amenity is required")
  });
  /*
amenities: z
      .array(z.string("Each amenity must have a valid name"))
      .nonempty("Amenities are required and must have at least one item"),
  */