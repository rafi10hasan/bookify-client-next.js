// loading.js

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const loading = new Array(5).fill(null);
  return (
    <>
      <div className="w-[90vw] md:w-[90vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[70vw] mx-auto grid grid-cols-1 lg:grid-cols-12 mt-10">
        <div className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40 " />
            <Skeleton className="h-12 w-40 " />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40 " />
            <Skeleton className="h-12 w-40 " />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40 "/>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40 "/>
          </div>
           
          <div className="flex gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40 "/>
          </div>

        </div>

        <div className="col-span-9 space-y-4">
         
        {loading.map((_, index) => (
            <div key={index} className="w-full h-auto grid grid-cols-6 md:grid-cols-9 gap-1 md:gap-6 space-x-2 bg-white p-2 shadow-lg rounded-sm">
            <div className="col-span-6 md:col-span-4">
              <Skeleton className="rounded-sm object-cover h-[300px] w-full" />
            </div>

            <div className="col-span-3 text-gray-800 mt-4">
              <div className="space-y-1 lg:space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded-full"/>
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="flex gap-2">
                 <Skeleton className="w-4 h-4 rounded-full"/>
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded-full"/>
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded-full"/>
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded-full"/>
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded-full"/>
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
            </div>
            <div className="justify-self-center col-span-3 md:col-span-2  space-y-2 mt-4 ">
              <div className="flex gap-2">
                <Skeleton className="w-4 h-4 rounded-full"/>
                <Skeleton className="w-24 h-4"/>
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-4 h-4 rounded-full"/>
                <Skeleton className="w-24 h-4" />
              </div>

              <div className="flex gap-2">
                <Skeleton className="w-4 h-4 rounded-full"/>
                <Skeleton className="w-24 h-4"/>
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-32 h-12" />
              </div>
            </div>
          </div>
        ))}
         
        </div>
      </div>
    </>
  );
}

/*
 
<div className="w-full h-auto grid grid-cols-6 md:grid-cols-9 gap-1 md:gap-6 space-x-2 bg-white p-2 shadow-lg rounded-sm">
      <div className="col-span-6 md:col-span-4">
        <Image
          src={image}
          className="rounded-sm object-cover h-[300px] w-full"
          width={400}
          height={300}
          alt={title}
        />
      </div>

      <div className="col-span-3 text-gray-800 mt-4">
      
        <div className="space-y-1 lg:space-y-2">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="flex gap-2 mb-2">
            <BedIcon className="text-deep-cyan"/>
            <span>{bed_type}</span>
          </div>
          <div className="flex gap-2">
            <User className="text-deep-cyan" />
            <span>{max_occupancy}</span>
          </div>
          <div className="flex gap-2">
            <Square className="text-deep-cyan" />
            <span>{size} m<sup>2</sup></span>
          </div>
          <div className="flex gap-2">
            <EyeIcon className="text-deep-cyan" />
            <h2>{view}</h2>
          </div>
          <div className="">
            <h4 className="text-xl text-deep-yellow font-semibold">{price}$ per night</h4>
          </div>
        </div>
    
      </div>
      <div className="justify-self-center col-span-3 md:col-span-2  space-y-2 mt-4 ">
        <div className="font-semibold text-deep-cyan">{ratingGrade(avgRating)}</div>
        <div className="flex gap-2 text-deep-yellow font-semibold">
          <StarIcon className="size-5 " />
          <p>{avgRating}</p>
        </div>

        <div>
          <p>{reviews.length} reviews</p>
        </div>
        <div className="w-32">
          <Button>see availability</Button>
        </div>
      </div>
    </div>

*/
