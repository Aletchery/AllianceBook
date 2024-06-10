import React from "react";
import { fetchCharacterImage } from "../services/swapi";

export default function Card({ id, character }) {
  return (
    <div
      key={id}
      className="fade-in rounded bg-white p-4 shadow-md transition duration-300 hover:scale-105"
    >
      <img
        src={fetchCharacterImage(id)}
        alt={character.name}
        className="relative z-0 h-auto w-full rounded-lg"
      />

      <h2 className="text-lg font-bold">{character.name}</h2>
      <p>Gender: {character.gender}</p>
      <p>Birth Year: {character.birth_year}</p>
    </div>
  );
}
