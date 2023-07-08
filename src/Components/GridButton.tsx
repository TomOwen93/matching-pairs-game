// import { useAutoAnimate } from "@formkit/auto-animate/react";

type Button = {
  id: number;
  isVisible: boolean;
  emoji: string;
  score: number;
};

interface SingleButtonType {
  Button: Button;
  handleTakeTurn: (Button: Button) => void;
  handleMatch: (Button: Button) => void;
}

export function GridButton({
  Button,
  handleTakeTurn,
  handleMatch,
}: SingleButtonType): JSX.Element {
  const handleClick = () => {
    handleTakeTurn(Button);
    handleMatch(Button);
  };

  return (
    <button className="grid-button-single" onClick={handleClick}>
      {Button.isVisible && (
        <span style={{ visibility: "visible" }}> {Button.emoji} </span>
      )}
    </button>
  );
}
