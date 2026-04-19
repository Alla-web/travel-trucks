import css from "./TravelTruckReviewsSection.module.css";

import { TravelTruck } from "@/types/travelTruck";
import RatingStars from "../RatingStars/RatingStars";

interface TravelTruckReviewsSectionProps {
  travelTruck: TravelTruck;
}

export default function TravelTruckReviewsSection({
  travelTruck,
}: TravelTruckReviewsSectionProps) {
  return (
    <section className={css.reviewsSection}>
      <ul className={css.reviwsContainer}>
        {travelTruck.reviews.map((review) => (
          <li key={travelTruck.id}>
            <div className={css.nameRatingContainer}>
              <p className={css.firstLetter}>
                {review.reviewer_name.slice(0, 1)}
              </p>
              <div className={css.nameRatingWrapper}>
                <h2 className={css.reviewersName}>{review.reviewer_name}</h2>
                <div>{<RatingStars rating={review.reviewer_rating} />}</div>
              </div>
            </div>

            <p className={css.reviewText}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
