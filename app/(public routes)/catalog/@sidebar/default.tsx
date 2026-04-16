"use client";

import Link from "next/link";

import css from "./default.module.css";

import { getTravelTrucks } from "@/lib/api/clientApi";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetTravelTucksParams } from "@/types/travelTruck";

export default function SideBarTravelTrucks() {
  const travelTrucksParams: GetTravelTucksParams = {
    location: "",
    form: "",
    engine: "",
    transmission: "",
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["campers"],
    queryFn: () => getTravelTrucks(travelTrucksParams),
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000,
  });

  const locationList: string[] = [
    ...new Set(data?.items.map((item) => item.location) || []),
  ];

  return (
    <section className={css.filterContainer}>
      <div className={css.locationContainer}>
        <p className={css.locationTitle}>Location</p>
        <div className={css.iconSelectContainer}>
          <svg className={css.mapIcon}>
            <use href="/iconsprite.svg#map-black" />
          </svg>

          <select className={css.locationSelect}>
            <option value=""> Виберіть локацію</option>
            {locationList.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <svg className={css.arrowDownIcon}>
            <use href="/iconsprite.svg#keyboard_arrow_down" />
          </svg>
        </div>
        <p className={css.filtersText}>Filters</p>

        <p className={css.filtersTitleText}>Vehicle form</p>
        <div className={css.vechicleVariablesContainer}>
          <button
            className={css.filterButtons}
            data-group="form"
            data-value="alcove"
          >
            {/* <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#wind" />
          </svg>{" "} */}
            <span className={css.filterBtnText}>Alcove</span>
          </button>

          <button
            className={css.filterButtons}
            data-group="form"
            data-value="panelTruck"
          >
            {/* <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#wind" />
          </svg>{" "} */}
            <span className={css.filterBtnText}>Panel truck</span>
          </button>

          <button
            className={css.filterButtons}
            data-group="form"
            data-value="fullyIntegrated"
          >
            {/* <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#wind" />
          </svg>{" "} */}
            <span className={css.filterBtnText}>Fully integrated</span>
          </button>
        </div>

        {/*  */}

        <p className={css.filtersTitleText}>Vehicle engine type</p>
        <div className={css.vechicleVariablesContainer}>
          <button
            className={css.filterButtons}
            data-group="engineType"
            data-value="diesel"
          >
            {/* <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>{" "} */}
            <span className={css.filterBtnText}>Diesel</span>
          </button>

          <button
            className={css.filterButtons}
            data-group="engineType"
            data-value="petrol"
          >
            {/* <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>{" "} */}
            <span className={css.filterBtnText}>Petrol</span>
          </button>

          <button
            className={css.filterButtons}
            data-group="engineType"
            data-value="hybrid"
          >
            {/* <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>{" "} */}
            <span className={css.filterBtnText}>Hybrid</span>
          </button>
        </div>

        {/*  */}

        <p className={css.filtersTitleText}>Vehicle transmission type</p>
        <div className={css.vechicleVariablesContainer}>
          <button
            className={css.filterButtons}
            data-group="transmissionType"
            data-value="automatic"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>{" "}
            <span className={css.filterBtnText}>Automatic</span>
          </button>

          <button
            className={css.filterButtons}
            data-group="transmissionType"
            data-value="manual"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>{" "}
            <span className={css.filterBtnText}>Manual</span>
          </button>
        </div>
      </div>

      {/*  */}

      <p className={css.filtersTitleText}>Vehicle equipment</p>
      <div className={css.vechicleVariablesContainer}>
        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="AC"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#wind" />
          </svg>{" "}
          <span className={css.filterBtnText}>AC</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="kitchen"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#cup-hot" />
          </svg>
          <span className={css.filterBtnText}>Kitchen</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="bathroom"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#ph_shower" />
          </svg>
          <span className={css.filterBtnText}>Bath</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="TV"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#tv" />
          </svg>
          <span className={css.filterBtnText}>TV</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="radio"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#ui-radios" />
          </svg>
          <span className={css.filterBtnText}>Radio</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="refrigerator"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#solar_fridge-outline" />
          </svg>
          <span className={css.filterBtnText}>Fridge</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="microwave"
        >
          <svg className={`${css.filterBtnIcons} ${css.microwaveIcon}`}>
            <use href="/iconsprite.svg#lucide_microwave" />
          </svg>
          <span className={css.filterBtnText}>Microwave</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="gas"
        >
          <svg className={`${css.filterBtnIcons} ${css.microwaveIcon}`}>
            <use href="/iconsprite.svg#hugeicons_gas-stove" />
          </svg>
          <span className={css.filterBtnText}>Gas</span>
        </button>

        <button
          className={css.filterButtons}
          data-group="equipment"
          data-value="water"
        >
          <svg className={`${css.filterBtnIcons} ${css.microwaveIcon}`}>
            <use href="/iconsprite.svg#ion_water-outline" />
          </svg>
          <span className={css.filterBtnText}>Water</span>
        </button>
      </div>
    </section>
  );
}
