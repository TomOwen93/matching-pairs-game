import { useState } from "react";
import { GridButton } from "./GridButton";
import { randomEmoji } from "../utils/RandomEmoji";

const emojis = [
  "🌕",
  "⛏",
  "☄",
  "📉",
  "☘",
  "👘",
  "🙍",
  "😋",
  "🌕",
  "⛏",
  "☄",
  "📉",
  "☘",
  "👘",
  "🙍",
  "😋",
];
const randomisedGrid = randomEmoji(emojis);

export function Grid(): JSX.Element {
  const [turn, setTurn] = useState(0);
  const [chosenCards, setChosenCards] = useState<string[]>([]);

  const handleTakeTurn = (emoji: string) => {
    chosenCards.length < 2
      ? setChosenCards([...chosenCards, emoji])
      : setChosenCards([]);
    setTurn((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div>
      <h3>hello this is the grid</h3>
      <p>Chosen cards: {chosenCards}</p>
      <p>Turn: {turn}</p>
      <hr />
      <section className="grid-buttons">
        {randomisedGrid.map((emoji, index) => (
          <GridButton
            key={index}
            handleTakeTurn={() => handleTakeTurn(emoji)}
            emoji={emoji}
          />
        ))}
      </section>
    </div>
  );
}
