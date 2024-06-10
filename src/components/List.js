import React, { useEffect, useState } from "react";
import { fetchAllCharacters } from "../services/swapi";
import Search from "./Search";
import PageNavigation from "../ui/PageNavigation";
import Loader from "../ui/Loader";
import Card from "./Card";

const initialFilter = {
  species: "",
  gender: "",
};

const List = () => {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [pagesNum, setPagesNum] = useState(0);

  const getIdFromUrl = (url) => {
    const id = url.match(/\/([0-9]*)\/$/)[1];
    return id;
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault(); // Prevent default behavior, if any
        handleNextPage();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault(); // Prevent default behavior, if any
        handlePrevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextPage, handlePrevPage]);

  useEffect(() => {
    const getAllCharacters = async () => {
      setLoading(true);
      const data = await fetchAllCharacters();
      setAllCharacters(data);
      setCharacters(data.slice(0, 8));
      setLoading(false);
    };
    getAllCharacters();
  }, []);

  useEffect(() => {
    const filtered = allCharacters.filter((character) => {
      const matchesSearchTerm = character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGender =
        filter.gender === "" || character.gender === filter.gender;
      const matchesSpecies =
        filter.species === "" || character.species.includes(filter.species);
      return matchesSearchTerm && matchesGender && matchesSpecies;
    });
    console.log(filtered);
    setFilteredCharacters(filtered);
    setPage(1);
    setPagesNum(Math.ceil(filtered.length / 8));
  }, [searchTerm, allCharacters, filter, setPagesNum]);

  useEffect(() => {
    if (!searchTerm && initialFilter === filter) {
      setCharacters(allCharacters.slice((page - 1) * 8, page * 8));
    } else {
      setCharacters(filteredCharacters.slice((page - 1) * 8, page * 8));
    }
  }, [page, searchTerm, filteredCharacters, allCharacters, filter]);

  return (
    <div className="p-4">
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        allCharacters={allCharacters}
      />

      <PageNavigation
        page={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        characters={characters.length}
        pagesNum={pagesNum}
        setPage={setPage}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {characters.map((character) => {
            const id = getIdFromUrl(character.url);
            return <Card id={id} character={character} />;
          })}
        </div>
      )}
    </div>
  );
};

export default List;
