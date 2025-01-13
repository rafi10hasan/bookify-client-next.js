import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6 lg:col-span-3">
        <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-auto" />
            <Skeleton className="h-4 w-auto" />
          </div>
        </div>
      </div>

      <div className="col-span-6 lg:col-span-3">
      <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-auto" />
            <Skeleton className="h-4 w-auto" />
          </div>
        </div>
      </div>

      <div className="col-span-6 lg:col-span-3">
      <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-auto" />
            <Skeleton className="h-4 w-auto" />
          </div>
        </div>
      </div>

      <div className="col-span-6 lg:col-span-3">
      <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-auto" />
            <Skeleton className="h-4 w-auto" />
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8">
      <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-60 w-auto" />
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
      <div className="bg-slate-50 shadow-md rounded-md px-4 py-2 space-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-60 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
