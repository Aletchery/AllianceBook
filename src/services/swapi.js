import axios from "axios";

const BASE_URL = "https://swapi.py4e.com/api/";

export const fetchAllCharacters = async () => {
  let characters = [];
  let url = `${BASE_URL}/people/`;

  while (url) {
    const response = await axios.get(url);
    characters = [...characters, ...response.data.results];
    url = response.data.next;
  }

  return characters;
};

export const fetchCharacterImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};

export const fetchAllSpecies = async () => {
  let allSpecies = [];
  let url = `${BASE_URL}/species/`;

  while (url) {
    try {
      const response = await axios.get(url);
      allSpecies = [...allSpecies, ...response.data.results];
      url = response.data.next;
    } catch (error) {
      console.error("Error fetching species:", error);
      return [];
    }
  }

  return allSpecies;
};

export const createSpeciesOptions = async () => {
  const speciesData = await fetchAllSpecies();
  const speciesOptions = speciesData.map((species) => ({
    value: species.url,
    label: species.name,
  }));

  return speciesOptions;
};
