import { BedDouble, Eye, Maximize2, Utensils, Sparkles, Users, Baby, LayoutGrid } from "lucide-react";

export default function RoomDetails({ room }) {
  const { Adults, children, bed_type, room_type, amenities, meal, view, size } = room;

  const detailItems = [
    { icon: Users, label: "Adults", value: Adults ?? "N/A" },
    { icon: Baby, label: "Children", value: children ?? "0" },
    { icon: Eye, label: "View", value: view },
    { icon: Maximize2, label: "Size", value: size ? `${size} m²` : null },
    { icon: BedDouble, label: "Bed Type", value: bed_type },
    { icon: LayoutGrid, label: "Room Type", value: room_type },
    { icon: Utensils, label: "Meal Plan", value: meal || "No meal included" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Room Overview & Amenities</h2>

      {/* Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {detailItems.map((item, idx) => {
          const Icon = item.icon;
          if (!item.value) return null;

          return (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-400 capitalize">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 capitalize truncate">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Amenities Badges */}
      {amenities?.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Amenities</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <span
                key={amenity._id || index}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60 capitalize"
              >
                {amenity.name || amenity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}