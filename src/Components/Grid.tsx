import { useReducer } from "react";
import { GridCard } from "./GridCard";
import { randomSortEmoji } from "../utils/SortRandomEmoji";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { randomEmoji } from "../utils/RandomEmoji";
import { Grid, GridItem, Heading, Card, Button } from "@chakra-ui/react";

export interface Card {
  id: number;
  isVisible: boolean;
  emoji: string;
  score: number;
}

interface GameActions {
  type: "update_score" | "reset" | "take_turn" | "flip_tile";
  payload?: any;
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

type GameState = {
  turn: number;
  recentCards: Card[];
  playerScore: number;
  gridCards: Card[];
};

const initialState: GameState = {
  turn: 0,
  recentCards: [],
  playerScore: 0,
  gridCards: gridObject,
};

function gameReducer(state: GameState, action: GameActions) {
  let updatedRecentCards = state.recentCards;
  let updatedTurn = state.turn;
  let updatedGridCards = state.gridCards;

  console.log(state.recentCards.length);
  switch (action.type) {
    case "update_score":
      return { ...state, playerScore: state.playerScore + 1 };

    case "take_turn":
      if (state.recentCards.length < 2) {
        updatedRecentCards = [...state.recentCards, action.payload.card];
      } else {
        updatedRecentCards = [];
      }
      updatedTurn = state.turn === 2 ? 0 : state.turn + 1;

      return { ...state, recentCards: updatedRecentCards, turn: updatedTurn };

    case "flip_tile":
      updatedGridCards = state.gridCards.map((card) => {
        if (
          card.id === state.recentCards[0].id ||
          card.id === state.recentCards[1].id
        ) {
          return {
            ...card,
            score: action.payload.score,
            isVisible: action.payload.visibility,
          };
        } else {
          return card;
        }
      });

      return { ...state, gridcards: updatedGridCards };

    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function GridComp(): JSX.Element {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [animationParent] = useAutoAnimate();

  const handleCheckMatch = () => {
    console.log("recentcards length: " + state.recentCards.length);
    if (state.recentCards.length === 2) {
      if (
        state.recentCards[0].emoji === state.recentCards[1].emoji &&
        state.recentCards[0].id !== state.recentCards[1].id
      ) {
        dispatch({
          type: "flip_tile",
          payload: { visibility: true, score: 0 },
        });
        dispatch({ type: "update_score" });
      } else {
      }
    } else {
      // dispatch({ type: "flip_tile", payload: { visibility: true, score: 1 } });
    }
  };

  return (
    <>
      <Heading textAlign={"center"}> Try to match 2 tiles </Heading>
      <hr />
      <div className="main-section">
        <Grid
          templateRows="repeat(4,1fr)"
          templateColumns="repeat(4,1fr)"
          gap={8}
        >
          {state.gridCards.map((card, index) => (
            <GridItem key={index}>
              <GridCard
                key={index}
                handleMatch={handleCheckMatch}
                card={card}
                dispatch={dispatch}
              />
            </GridItem>
          ))}
        </Grid>

        <div className="below-grid">
          {state.playerScore < 8 && (
            <Card>
              <p ref={animationParent}>Chosen cards: </p>{" "}
              <span className="chosen-cards">
                <ul ref={animationParent} className="chosen-list">
                  {state.recentCards.map((card, index) => (
                    <li key={index}>{card.emoji}</li>
                  ))}
                </ul>
              </span>
              <p>Turn: {state.turn}</p>
              <p>Your current score is: {state.playerScore}</p>
            </Card>
          )}
          {state.playerScore === 8 && (
            <div className="reset-button">
              <p>You Win!</p>{" "}
              <Button onClick={() => dispatch({ type: "reset" })}>Reset</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
