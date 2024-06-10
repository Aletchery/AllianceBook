import React from "react";
import Button from "./Button";

export default function PageNavigation({
  page,
  handlePrevPage,
  handleNextPage,
  characters,
  pagesNum,
  setPage,
}) {
  return (
    <div className="my-4 flex justify-around md:justify-center">
      <div className="flex space-x-2">
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        {Array.from({ length: pagesNum }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`hidden rounded px-4 py-2 text-slate-300 transition duration-300 hover:scale-105 md:block ${
              page === index + 1
                ? "bg-slate-700 text-white"
                : "bg-slate-400 hover:bg-slate-800 disabled:bg-slate-500"
            }`}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
        <div className="font-bold md:hidden">
          {page}/{pagesNum}
        </div>
        <Button onClick={handleNextPage} disabled={page === pagesNum}>
          Next
        </Button>
      </div>
    </div>
  );
}
