"use client";

import Image from "next/image";
import Link from "next/link";

import css from "./TravelTruckCard.module.css";

import { TravelTruck, capitalizer } from "@/types/travelTruck";

interface TravelTruckCardProps {
  travelTruck: TravelTruck;
}

export default function TravelTruckCard({ travelTruck }: TravelTruckCardProps) {
  return (
    <div className={css.cardContainer}>
      <div className={css.imageConatiner}>
        <Image
          className={css.image}
          src={travelTruck.gallery[0].thumb}
          alt={travelTruck.name}
          fill
          unoptimized
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className={css.infoContainer}>
        <div className={css.namePriceContainer}>
          <p className={css.travelTruckName}>{travelTruck.name}</p>
          <div className={css.priceIconContainer}>
            <p>€{travelTruck.price.toFixed(2)}</p>
            <svg className={css.heardIicon}>
              <use href="/iconsprite.svg#heard-black" />
            </svg>
          </div>
        </div>
        <div className={css.reviewLocationContainer}>
          <div className={css.reviewContainer}>
            <svg className={css.starIcon}>
              <use href="/iconsprite.svg#rating-yellow" />
            </svg>
            <p className={css.reviewText}>
              {travelTruck.rating} ({travelTruck.reviews.length} Reviews)
            </p>
          </div>
          <div className={css.locationContainer}>
            <svg className={css.locationIcon}>
              <use href="/iconsprite.svg#map-black" />
            </svg>
            <p className={css.locationText}>{travelTruck.location}</p>
          </div>
        </div>
        <p className={css.description}>{travelTruck.description}</p>
        <ul className={css.optionsContainer}>
          <li className={css.optionItem}>
            <svg className={css.optionsIccons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>
            <p>{capitalizer(travelTruck.transmission)}</p>
          </li>
          <li className={css.optionItem}>
            <svg className={css.optionsIccons}>
              <use href="/iconsprite.svg#fuel-pump" />
            </svg>
            <p>{capitalizer(travelTruck.engine)}</p>
          </li>
          {travelTruck.kitchen && (
            <li className={css.optionItem}>
              <svg className={css.optionsIccons}>
                <use href="/iconsprite.svg#cup-hot" />
              </svg>
              <p>Kitchen</p>
            </li>
          )}
          {travelTruck.AC && (
            <li className={css.optionItem}>
              <svg className={css.optionsIccons}>
                <use href="/iconsprite.svg#wind" />
              </svg>
              <p>AC</p>
            </li>
          )}
          {travelTruck.bathroom && (
            <li className={css.optionItem}>
              <svg className={css.optionsIccons}>
                <use href="/iconsprite.svg#ph_shower" />
              </svg>
              <p>Bath</p>
            </li>
          )}
          {travelTruck.TV && (
            <li className={css.optionItem}>
              <svg className={css.optionsIccons}>
                <use href="/iconsprite.svg#tv" />
              </svg>
              <p>TV</p>
            </li>
          )}
          {travelTruck.radio && (
            <li className={css.optionItem}>
              <svg className={css.optionsIccons}>
                <use href="/iconsprite.svg#ui-radios" />
              </svg>
              <p>Radio</p>
            </li>
          )}
          {travelTruck.refrigerator && (
            <li className={css.optionItem}>
              <svg className={css.optionsIccons}>
                <use href="/iconsprite.svg#solar_fridge-outline" />
              </svg>
              <p>Fridge</p>
            </li>
          )}
          {travelTruck.microwave && (
            <li className={css.optionItem}>
              <svg className={`${css.optionsIccons} ${css.microwaveIcon}`}>
                <use href="/iconsprite.svg#lucide_microwave" />
              </svg>
              <p>Microwave</p>
            </li>
          )}
          {travelTruck.gas && (
            <li className={css.optionItem}>
              <svg className={`${css.optionsIccons} ${css.microwaveIcon}`}>
                <use href="/iconsprite.svg#hugeicons_gas-stove" />
              </svg>
              <p>Gas</p>
            </li>
          )}
          {travelTruck.water && (
            <li className={css.optionItem}>
              <svg className={`${css.optionsIccons} ${css.microwaveIcon}`}>
                <use href="/iconsprite.svg#ion_water-outline" />
              </svg>
              <p>Water</p>
            </li>
          )}
        </ul>
        <Link className={css.showMoreBtn} href={`/catalog/${travelTruck.id}`}>
          Show more
        </Link>
      </div>
    </div>
  );
}
