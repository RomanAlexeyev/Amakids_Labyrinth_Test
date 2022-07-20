import { useSelector, useDispatch } from "react-redux";

import { setIsReady, setChoiceIsMade, setIsWinner } from "../store/gameSlice";

import "./scss/cell.scss";

function Cell({ currentStart, id, row, col, renderMoves }) {
  const currentFinish = useSelector((state) => state.grid.currentFinish);

  const choiceIsMade = useSelector((state) => state.game.choiceIsMade);
  const isWinner = useSelector((state) => state.game.isWinner);
  const isReady = useSelector((state) => state.game.isReady);

  const dispatch = useDispatch();
  const setReady = (bool) => dispatch(setIsReady(bool));
  const setChoice = (bool) => dispatch(setChoiceIsMade(bool));
  const setWinner = (bool) => dispatch(setIsWinner(bool));

  const getIcon = (row, col) => {
    if (
      row === currentFinish.row &&
      col === currentFinish.col &&
      choiceIsMade
    ) {
      return <div className="start_finish_cell finish"></div>;
    }
    if (row === currentStart.row && col === currentStart.col) {
      return (
        <div
          className="start_finish_cell start"
          onAnimationEnd={renderMoves}
        ></div>
      );
    }
    return null;
  };

  const revealFinish = (row, col) => {
    if (choiceIsMade || !isReady) return;
    setWinner(row === currentFinish.row && col === currentFinish.col);
    setChoice(true);
    setReady(false);
  };

  return (
    <div
      className={`grid_cell ${
        isWinner
          ? "win"
          : choiceIsMade && !isWinner
          ? "lose"
          : isReady
          ? "ready"
          : ""
      }`}
      id={id}
      key={id}
      onClick={() => revealFinish(row, col)}
    >
      {getIcon(row, col)}
    </div>
  );
}

export default Cell;
