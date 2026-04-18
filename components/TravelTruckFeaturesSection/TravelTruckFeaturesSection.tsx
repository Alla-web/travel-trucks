import css from "./TravelTruckFeaturesSection.module.css";

import { TravelTruck, capitalizer } from "@/types/travelTruck";

interface TravelTruckFeaturesSectionProps {
  travelTruck: TravelTruck;
}

export default function TravelTruckFeaturesSection({
  travelTruck,
}: TravelTruckFeaturesSectionProps) {
  return (
    <section className={css.featuresSection}>
      <ul className={css.equipmentContainer}>
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
      <div className={css.vechicleDetailsContainer}>
        <div className={css.vechicleDetailsTitleWrapper}>
          <h3 className={css.vechicleDetailsTitle}>Vehicle details</h3>
        </div>
        <div className={css.detailsContainer}>
          <div className={css.detalItem}>
            <p>Form</p>
            <p>{capitalizer(travelTruck.form)}</p>
          </div>
          <div className={css.detalItem}>
            <p>Length</p>
            <p>{travelTruck.length}</p>
          </div>
          <div className={css.detalItem}>
            <p>Width</p>
            <p>{travelTruck.width}</p>
          </div>
          <div className={css.detalItem}>
            <p>Height</p>
            <p>{travelTruck.height}</p>
          </div>
          <div className={css.detalItem}>
            <p>Tank</p>
            <p>{travelTruck.tank}</p>
          </div>
          <div className={css.detalItem}>
            <p>Consumption</p>
            <p>{travelTruck.consumption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
