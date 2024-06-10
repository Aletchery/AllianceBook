import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { createSpeciesOptions } from "../services/swapi";

export default function Search({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  allCharacters,
}) {
  function createGenderOptions(characters) {
    const gendersSet = new Set(characters.map((character) => character.gender));
    const filteredGenders = Array.from(gendersSet).filter((gender) => gender);
    const genderOptions = filteredGenders.map((gender) => ({
      value: gender,
      label: gender === "n/a" ? "Unknown" : gender,
    }));

    return genderOptions;
  }

  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  const speciesSelectRef = useRef(null);
  const genderSelectRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    createSpeciesOptions().then((options) => setSpeciesOptions(options));
  }, []);

  useEffect(() => {
    setGenderOptions(createGenderOptions(allCharacters));
  }, [allCharacters]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        speciesSelectRef.current.focus();
      }
      if (event.key === "g" || event.key === "G") {
        event.preventDefault();
        genderSelectRef.current.focus();
      }
      if (event.key === "i" || event.key === "I") {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.25rem",
      borderColor: state.isFocused
        ? "rgb(15 23 42 / var(--tw-border-opacity))"
        : "#e5e7eb",
      boxShadow: state.isFocused
        ? "rgb(15 23 42 / var(--tw-border-opacity));"
        : "",
      "&:hover": {
        borderColor: "rgb(51 65 85 / var(--tw-border-opacity))",
      },
      transition: 500,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#334155"
        : state.isFocused
          ? "#e5e7eb"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000000",
    }),
  };

  return (
    <div className="flex flex-col items-center justify-between border-b border-stone-700 pb-3 md:flex-row">
      <div className="flex w-full flex-grow flex-col gap-3 md:w-auto md:flex-row">
        <Select
          ref={speciesSelectRef}
          placeholder="Select Species"
          styles={customStyles}
          options={speciesOptions}
          value={filter.species.value}
          isClearable
          onChange={(selectedOption) =>
            setFilter({
              ...filter,
              species: selectedOption ? selectedOption.value : "",
            })
          }
          className="mb-4 w-full md:mb-0 md:w-48"
        />
        <Select
          ref={genderSelectRef}
          placeholder="Select Gender"
          styles={customStyles}
          className="mb-4 w-full capitalize md:mb-0 md:w-48"
          options={genderOptions}
          isClearable
          value={filter.gender.value}
          onChange={(selectedOption) =>
            setFilter({
              ...filter,
              gender: selectedOption ? selectedOption.value : "",
            })
          }
        />
      </div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search characters"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded border p-2 transition duration-300 ease-in-out hover:border-slate-700 md:mb-0 md:w-64"
        aria-label="Search characters"
      />
    </div>
  );
}
