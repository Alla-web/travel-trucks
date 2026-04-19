"use client";

import { useState } from "react";

import css from "./LocationsSelect.module.css";

interface LocationsSelectProps {
  locationsList: string[];
  onChange: (location: string) => void;
}

export default function LocationsSelect({
  locationsList,
  onChange,
}: LocationsSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const displayValue = selected || locationsList[0] || "Оберіть локацію";

  const handleClick = (location: string) => {
    if (location === "Україна") {
      setSelected(null);
      onChange("");
    } else {
      setSelected(location);
      onChange(location);
    }
    setIsOpen(false);
  };

  const isAnyLocationSelected = selected !== null && selected !== "";

  return (
    <div className={css.selectWrapper}>
      <div className={css.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        <svg className={css.mapIcon}>
          <use href="/iconsprite.svg#map-black" />
        </svg>

        <span className={isAnyLocationSelected ? css.selectedText : ""}>
          {displayValue}
        </span>

        <svg className={css.arrowDownIcon}>
          <use href="/iconsprite.svg#keyboard_arrow_down" />
        </svg>
      </div>

      {isOpen && (
        <ul className={css.optionsList}>
          {locationsList.map((location, index) => (
            <li
              key={index}
              className={`${css.option} ${selected === location ? css.activeOption : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(location);
              }}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
