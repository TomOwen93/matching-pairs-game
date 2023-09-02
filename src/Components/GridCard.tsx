// import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Button } from "@chakra-ui/react";
import { Card } from "./Grid";

interface GridCardProps {
  card: Card;
  dispatch: React.Dispatch<any>;

  handleMatch: (card: Card) => void;
}

export function GridCard({
  card,

  handleMatch,
  dispatch,
}: GridCardProps): JSX.Element {
  const handleClick = () => {
    handleMatch(card);
  };

  return (
    <Button className="grid-button-single" onClick={handleClick}>
      {card.isVisible && (
        <span style={{ visibility: "visible" }}> {card.emoji} </span>
      )}
    </Button>
  );
}
