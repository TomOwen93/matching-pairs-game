import { useState } from "react";
import { GridButton } from "./GridButton";
import { randomSortEmoji } from "../utils/SortRandomEmoji";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { randomEmoji } from "../utils/RandomEmoji";

interface ButtonType {
  id: number;
  isVisible: boolean;
  emoji: string;
  score: number;
}

const randomisedGrid = randomSortEmoji(randomEmoji());
const gridObject = randomisedGrid.map((emoji, index) => {
  return {
    id: index,
    isVisible: false,
    emoji: emoji,
    score: 1,
  };
});

export function Grid(): JSX.Element {
  const [turn, setTurn] = useState(0);
  const [recentCards, setRecentCards] = useState<ButtonType[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [gridCards, setGridcards] = useState<ButtonType[]>(gridObject);
  const [animationParent] = useAutoAnimate();

  const handleMatch = (button: ButtonType) => {
    if (recentCards.length === 2) {
      if (
        recentCards[0].emoji === recentCards[1].emoji &&
        recentCards[0].id !== recentCards[1].id
      ) {
        setPlayerScore((prev) => prev + recentCards[1].score);
        handleTileData(0, true);
      } else {
        handleTileData(1, false);
      }
    } else {
      setGridcards(
        gridCards.map((el) => {
          if (el.id === button.id || el.id === button.id) {
            return { ...el, isVisible: true };
          } else {
            return el;
          }
        })
      );
    }
  };

  const handleTileData = (score: number, visibility: boolean) => {
    return setGridcards(
      gridCards.map((el) => {
        if (el.id === recentCards[0].id || el.id === recentCards[1].id) {
          return { ...el, score: score, isVisible: visibility };
        } else {
          return el;
        }
      })
    );
  };

  const handleReset = () => {
    setGridcards(
      randomSortEmoji(randomEmoji()).map((emoji, index) => {
        return {
          id: index,
          isVisible: false,
          emoji: emoji,
          score: 1,
        };
      })
    );
    setPlayerScore(0);
    setTurn(0);
    setRecentCards([]);
  };

  const handleTakeTurn = (button: ButtonType) => {
    if (recentCards.length < 2) {
      setRecentCards([...recentCards, button]);
    } else {
      setRecentCards([]);
    }
    setTurn((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div>
      <h3 className="header">Try to match 2 tiles</h3>
      <hr />
      <div className="main-section">
        <div className="grid-buttons">
          {gridCards.map((button, index) => (
            <GridButton
              key={index}
              handleTakeTurn={handleTakeTurn}
              handleMatch={handleMatch}
              Button={button}
            />
          ))}
        </div>
        <div className="below-grid">
          {playerScore < 8 && (
            <div>
              <p ref={animationParent}>Chosen cards: </p>{" "}
              <span className="chosen-cards">
                <ul ref={animationParent} className="chosen-list">
                  {recentCards.map((card, index) => (
                    <li key={index}>{card.emoji}</li>
                  ))}
                </ul>
              </span>
              <p>Turn: {turn}</p>
              <p>Your current score is: {playerScore}</p>
            </div>
          )}
          {playerScore === 8 && (
            <div className="reset-button">
              <p>You Win!</p> <button onClick={handleReset}>Reset</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
