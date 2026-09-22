// ReviewList.jsx
import Review from "./Review";

export default function ReviewList({ reviews = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 m-2">Guest Feedback</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
          Verified Purchases Only
        </span>
      </div>

      {reviews.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {reviews.map((review, index) => (
            <Review key={review._id || index} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic py-4">
          No verified reviews available for this room yet.
        </p>
      )}
    </div>
  );
}