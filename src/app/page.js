"use client";

import { useState } from "react";

const GRID = [
  ["L", "U", "K", "E", "X", "M", "V", "A", "D", "E", "R", "B", "E", "O"],
  ["B", "C", "F", "G", "H", "I", "J", "5", "L", "M", "N", "D", "E", "R"],
  ["6", "O", "D", "A", "P", "Q", "R", "S", "T", "U", "V", "R", "D", "L"],
  ["W", "X", "B", "Z", "A", "G", "C", "D", "M", "F", "G", "A", "B", "R"],
  ["H", "A", "N", "A", "Y", "X", "W", "V", "U", "T", "S", "D", "E", "K"],
  ["A", "B", "C", "C", "R", "R", "G", "D", "2", "J", "S", "N", "W", "R"],
  ["R", "2", "D", "2", "L", "M", "N", "V", "A", "Q", "O", "G", "E", "M"],
  ["R", "2", "D", "2", "G", "M", "Q", "O", "T", "R", "L", "D", "W", "R"],
  ["F", "E", "T", "T", "E", "I", "A", "O", "P", "L", "T", "E", "E", "N"],
  ["T", "S", "A", "B", "E", "R", "M", "O", "P", "L", "R", "H", "W", "R"],
  ["T", "S", "A", "B", "E", "R", "M", "D", "O", "O", "K", "U", "W", "R"],

];

const ANSWERS = ["LUKE", "VADER", "YODA", "HAN", "BOBA", "SABER", "SOLO", "R2D2", "DARTH", "LEIA", "FETT", "DOOKU"];

export default function StarWarsCrossword() {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedCoords, setSelectedCoords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  function handleLetterClick(letter, row, col) {
    const newCoords = [...(selectedCoords || []), [row, col]];
    const newWord = newCoords.map(([r, c]) => GRID[r][c]).join("");

    if (newCoords.length >= 2) {
      const [[r1, c1], [r2, c2]] = newCoords;
      const dr = r2 - r1;
      const dc = c2 - c1;
      const isValidLine = newCoords.every(([r, c], i) => r === r1 + i * dr && c === c1 + i * dc);
      if (!isValidLine) return;
    }

    setSelectedCoords(newCoords);
    setSelectedWord(newWord);

    const match = ANSWERS.find(word => word === newWord && !foundWords.includes(word));
    if (match) {
      setFoundWords([...foundWords, match]);
      setSelectedWord("");
      setSelectedCoords([]);
    }

  }

  function reset() {
    setSelectedWord("");
    setSelectedCoords([]);
    setFoundWords([]);
  }

  function deleteLastLetter() {
    setSelectedWord(prev => prev.slice(0, -1));
    setSelectedCoords(prev => prev.slice(0, -1));
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold tracking-widest">STAR WARS CROSSWORD</h1>

      <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID[0].length}, 2rem)` }}>
        {GRID.map((row, rIdx) =>
          row.map((letter, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => letter && handleLetterClick(letter, rIdx, cIdx)}
              className={`w-8 h-8 m-0.5 flex items-center justify-center text-lg font-bold border border-yellow-400 select-none cursor-pointer ${letter ? "bg-yellow-900 hover:bg-yellow-700" : "bg-gray-800"}`}
            >
              {letter}
            </div>
          ))
        )}
      </div>

      <div className="text-lg">CHOSEN WORDS: <span className="text-white">{selectedWord}</span></div>

      <div className="mt-4 w-full max-w-md">
        <h2 className="text-xl mb-2">Find These Words:</h2>
        <ul className="grid grid-cols-2 gap-2">
          {ANSWERS.map((word, index) => (
            <li key={`${word}-${index}`} className="flex items-center gap-2">
              <input type="checkbox" checked={foundWords.includes(word)} readOnly />
              <label className={`${foundWords.includes(word) ? "line-through text-gray-400" : ""}`}>{word}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={deleteLastLetter} className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500">
          Delete Last
        </button>
        <button onClick={reset} className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400">
          Reset
        </button>
      </div>
    </div>
  );
}
