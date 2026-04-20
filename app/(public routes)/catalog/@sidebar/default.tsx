"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import css from "./default.module.css";

import { getTravelTrucks } from "@/lib/api/clientApi";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetTravelTucksParams } from "@/types/travelTruck";
import { TravelTruckFilters } from "@/types/travelTruck";
import LocationsSelect from "@/components/LocationsSelect/LocationsSelect";

export default function SideBarTravelTrucks() {
  const router = useRouter();

  const [filters, setFilters] = useState<TravelTruckFilters>({
    page: 1,
    location: "",
    form: "",
    engine: "",
    transmission: "",
    equipment: [],
  });

  //список всіх кемперів для вибірки локацій
  const getTravelTrucksParams: GetTravelTucksParams = {
    location: "",
    form: "",
    engine: "",
    transmission: "",
    equipment: [],
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["campers"],
    queryFn: () => getTravelTrucks(getTravelTrucksParams),
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000,
  });

  const locationsList: string[] = [
    "Україна",
    ...(data?.items.reduce((locations, item) => {
      if (!locations.includes(item.location)) {
        locations.push(item.location);
      }
      return locations;
    }, [] as string[]) || []),
  ];

  const handleLocationChange = (location: string) => {
    setFilters((prevValue) => ({
      ...prevValue,
      location: location,
    }));
  };

  const handleFormEngineTransmissionBtn = (group: string, value: string) => {
    setFilters((prevValue) => ({
      ...prevValue,
      [group]:
        prevValue[group as keyof typeof prevValue] === value ? "" : value,
    }));
  };

  const handleEquipmentClick = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(value)
        ? prev.equipment.filter((item) => item !== value)
        : [...prev.equipment, value],
    }));
  };

  const handleSearchClick = () => {
    const searchParams = new URLSearchParams();

    searchParams.set("page", "1");

    if (filters.location) searchParams.set("location", filters.location);
    if (filters.form) searchParams.set("form", filters.form);
    if (filters.engine) searchParams.set("engine", filters.engine);
    if (filters.transmission)
      searchParams.set("transmission", filters.transmission);
    if (filters.equipment.length > 0)
      searchParams.set("equipment", filters.equipment.join(","));

    router.push(`/catalog/?${searchParams.toString()}`);
  };

  const handleResetFilters = () => {
    const filters = {
      page: 1,
      location: "",
      form: "",
      engine: "",
      transmission: "",
      equipment: [],
    };

    setFilters(filters);
    router.push("/catalog");
  };

  return (
    <section className={css.filterContainer}>
      <div className={css.locationContainer}>
        <p className={css.locationTitle}>Location</p>
        <div className={css.iconSelectContainer}>
          <LocationsSelect
            locationsList={locationsList}
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>
        <p className={css.filtersText}>Filters</p>

        {/*  */}

        <p className={css.filtersTitleText}>Vehicle form type</p>
        <div className={css.vechicleVariablesContainer}>
          <button
            onClick={() => handleFormEngineTransmissionBtn("form", "alcove")}
            className={`${css.filterButtons} ${filters.form === "alcove" ? css.activeFilterButton : ""}`}
            data-group="form"
            data-value="alcove"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#grid-3x3" />
            </svg>{" "}
            <span className={css.filterBtnText}>Alcove</span>
          </button>

          <button
            onClick={() =>
              handleFormEngineTransmissionBtn("form", "panelTruck")
            }
            className={`${css.filterButtons} ${filters.form === "panelTruck" ? css.activeFilterButton : ""}`}
            data-group="form"
            data-value="panelTruck"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#grid-1x2" />
            </svg>{" "}
            <span className={css.filterBtnText}>Panel truck</span>
          </button>

          <button
            onClick={() =>
              handleFormEngineTransmissionBtn("form", "fullyIntegrated")
            }
            className={`${css.filterButtons} ${filters.form === "fullyIntegrated" ? css.activeFilterButton : ""}`}
            data-group="form"
            data-value="fullyIntegrated"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#grid-2x2" />
            </svg>{" "}
            <span className={`${css.filterBtnText} ${css.fullyIntegrated}`}>
              Fully integrated
            </span>
          </button>
        </div>

        {/*  */}

        <p className={css.filtersTitleText}>Vehicle engine type</p>
        <div className={css.vechicleVariablesContainer}>
          <button
            onClick={() => handleFormEngineTransmissionBtn("engine", "diesel")}
            className={`${css.filterButtons} ${filters.engine === "diesel" ? css.activeFilterButton : ""}`}
            data-group="engine"
            data-value="diesel"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#fuel-pump" />
            </svg>{" "}
            <span className={css.filterBtnText}>Diesel</span>
          </button>

          <button
            onClick={() => handleFormEngineTransmissionBtn("engine", "petrol")}
            className={`${css.filterButtons} ${filters.engine === "petrol" ? css.activeFilterButton : ""}`}
            data-group="engine"
            data-value="petrol"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#fuel-pump" />
            </svg>{" "}
            <span className={css.filterBtnText}>Petrol</span>
          </button>

          <button
            onClick={() => handleFormEngineTransmissionBtn("engine", "hybrid")}
            className={`${css.filterButtons} ${filters.engine === "hybrid" ? css.activeFilterButton : ""}`}
            data-group="engine"
            data-value="hybrid"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#fuel-pump" />
            </svg>{" "}
            <span className={css.filterBtnText}>Hybrid</span>
          </button>
        </div>

        {/*  */}

        <p className={css.filtersTitleText}>Vehicle transmission type</p>
        <div className={css.vechicleVariablesContainer}>
          <button
            onClick={() =>
              handleFormEngineTransmissionBtn("transmission", "automatic")
            }
            className={`${css.filterButtons} ${filters.transmission === "automatic" ? css.activeFilterButton : ""}`}
            data-group="transmission"
            data-value="automatic"
          >
            <svg className={css.filterBtnIcons}>
              <use href="/iconsprite.svg#diagram" />
            </svg>{" "}
            <span className={css.filterBtnText}>Automatic</span>
          </button>

          <button
            onClick={() =>
              handleFormEngineTransmissionBtn("transmission", "manual")
            }
            className={`${css.filterButtons} ${filters.transmission === "manual" ? css.activeFilterButton : ""}`}
            data-group="transmission"
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
          onClick={() => handleEquipmentClick("AC")}
          className={`${css.filterButtons} ${filters.equipment?.includes("AC") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="AC"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#wind" />
          </svg>{" "}
          <span className={css.filterBtnText}>AC</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("kitchen")}
          className={`${css.filterButtons} ${filters.equipment?.includes("kitchen") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="kitchen"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#cup-hot" />
          </svg>
          <span className={css.filterBtnText}>Kitchen</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("bathroom")}
          className={`${css.filterButtons} ${filters.equipment?.includes("bathroom") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="bathroom"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#ph_shower" />
          </svg>
          <span className={css.filterBtnText}>Bath</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("TV")}
          className={`${css.filterButtons} ${filters.equipment?.includes("TV") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="TV"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#tv" />
          </svg>
          <span className={css.filterBtnText}>TV</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("radio")}
          className={`${css.filterButtons} ${filters.equipment?.includes("radio") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="radio"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#ui-radios" />
          </svg>
          <span className={css.filterBtnText}>Radio</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("refrigerator")}
          className={`${css.filterButtons} ${filters.equipment?.includes("refrigerator") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="refrigerator"
        >
          <svg className={css.filterBtnIcons}>
            <use href="/iconsprite.svg#solar_fridge-outline" />
          </svg>
          <span className={css.filterBtnText}>Fridge</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("microwave")}
          className={`${css.filterButtons} ${filters.equipment?.includes("microwave") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="microwave"
        >
          <svg className={`${css.filterBtnIcons} ${css.microwaveIcon}`}>
            <use href="/iconsprite.svg#lucide_microwave" />
          </svg>
          <span className={css.filterBtnText}>Microwave</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("gas")}
          className={`${css.filterButtons} ${filters.equipment?.includes("gas") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="gas"
        >
          <svg className={`${css.filterBtnIcons} ${css.microwaveIcon}`}>
            <use href="/iconsprite.svg#hugeicons_gas-stove" />
          </svg>
          <span className={css.filterBtnText}>Gas</span>
        </button>

        <button
          onClick={() => handleEquipmentClick("water")}
          className={`${css.filterButtons} ${filters.equipment?.includes("water") ? css.activeFilterButton : ""}`}
          data-group="equipment"
          data-value="water"
        >
          <svg className={`${css.filterBtnIcons} ${css.microwaveIcon}`}>
            <use href="/iconsprite.svg#ion_water-outline" />
          </svg>
          <span className={css.filterBtnText}>Water</span>
        </button>
      </div>

      <div className={css.btnsContainer}>
        <button
          onClick={handleSearchClick}
          className={`${css.btns} ${css.searchBtn}`}
          type="button"
        >
          Search
        </button>

        <button
          onClick={handleResetFilters}
          className={`${css.btns} ${css.resetBtn}`}
          type="button"
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}
