interface GridButtonProps {
  handleTakeTurn: () => void;
  emoji: string;
}

export function GridButton(props: GridButtonProps): JSX.Element {
  return (
    <button className="grid-button-single" onClick={props.handleTakeTurn}>
      <span style={{ visibility: "visible" }}> {props.emoji} </span>
    </button>
  );
}
