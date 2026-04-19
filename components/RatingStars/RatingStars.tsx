import css from "./RatingStars.module.css";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const totalStars = 5;

  return (
    <div className={css.starsContainer}>
      {[...Array(totalStars)].map((_, index) => {
        const startValue = index + 1;

        return (
          <svg key={index} className={css.starIcon}>
            <use
              href={
                startValue <= rating
                  ? "/iconsprite.svg#rating-yellow"
                  : "/iconsprite.svg#rating"
              }
            />
          </svg>
        );
      })}
    </div>
  );
}
