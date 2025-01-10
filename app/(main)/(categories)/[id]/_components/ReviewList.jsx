import Review from "./Review";

export default function ReviewList ({reviews}) {
  return (
    <>
    {
        reviews.length > 0 ? ( <p className="text-midnight font-semibold">There are some verify purchase user review for this room.</p>) : (<p className="text-midnight font-semibold">there are no verify purchase review for this room.</p>)
    }
    
       <div className="space-y-4">
            {reviews?.map((review, index) => (
                <Review
                    key={index}
                    review={review}
                 
                />
            ))}
        </div>

    
 
    </>
  );
}
