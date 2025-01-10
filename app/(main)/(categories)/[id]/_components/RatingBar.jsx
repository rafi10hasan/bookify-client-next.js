export const RatingBar = ({ label, percentage }) => (
    <div className="flex items-center space-x-2">
      <h1 className="w-28">{label}:</h1>
      <div className="w-full h-3 rounded-sm bg-gray-200 relative ml-2">
        <div
          className="absolute top-0 h-3 bg-deep-yellow rounded-sm"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-2">{percentage.toFixed(0)}%</span>
    </div>
  );