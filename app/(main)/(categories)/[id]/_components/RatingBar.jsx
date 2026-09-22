export const RatingBar = ({ label, percentage = 0 }) => (
  <div className="flex items-center space-x-3 text-sm">
    <span className="w-16 font-medium text-gray-600">{label}</span>
    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full bg-amber-400 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
      ></div>
    </div>
    <span className="w-10 text-right text-xs font-semibold text-gray-500">
      {percentage.toFixed(0)}%
    </span>
  </div>
);