import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentStart,
  setCurrentFinish,
  setMovesSuccession,
} from "../store/gridSlice";

import "./scss/grid.scss";

import Message from "./Message";
import Cell from "./Cell";

function Grid() {
  const rowsQ = useSelector((state) => state.grid.rowsQ);
  const columnsQ = useSelector((state) => state.grid.columnsQ);
  const movesQ = useSelector((state) => state.grid.movesQ);
  const currentStart = useSelector((state) => state.grid.currentStart);

  const newGame = useSelector((state) => state.game.newGame);

  const dispatch = useDispatch();
  const setStart = (row, col) =>
    dispatch(setCurrentStart({ row: row, col: col }));

  const setFinish = (row, col) =>
    dispatch(setCurrentFinish({ row: row, col: col }));

  const setMoves = (move) => dispatch(setMovesSuccession(move));

  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getOppositeMove = (move) => {
    const oppositeMoves = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };
    return oppositeMoves[move];
  };

  const getMoves = (pos, lastMove) => {
    const moves = { vertical: ["up", "down"], horizontal: ["left", "right"] };

    if (pos.row === 0) {
      moves.vertical.shift();
    }
    if (pos.row === rowsQ - 1) {
      moves.vertical.pop();
    }
    if (pos.col === 0) {
      moves.horizontal.shift();
    }
    if (pos.col === columnsQ - 1) {
      moves.horizontal.pop();
    }

    const targetMoves = [...moves.vertical, ...moves.horizontal];

    return targetMoves.filter((move) => move !== getOppositeMove(lastMove));
  };

  const getRandomMove = (arr) => {
    const index = getRandom(arr.length);
    return arr[index];
  };

  const getNewPos = (pos, move) => {
    let currentPos = pos;
    switch (move) {
      case "up":
        currentPos = { ...currentPos, row: currentPos.row - 1 };
        break;
      case "down":
        currentPos = { ...currentPos, row: currentPos.row + 1 };
        break;
      case "left":
        currentPos = { ...currentPos, col: currentPos.col - 1 };
        break;
      case "right":
        currentPos = { ...currentPos, col: currentPos.col + 1 };
        break;
      default:
        return currentPos;
    }
    return currentPos;
  };

  const renderMoves = () => {
    let pos = { row: currentStart.row, col: currentStart.col };
    let lastMove = null;
    for (let i = 0; i < movesQ; i++) {
      let availableMoves = getMoves(pos, lastMove);
      const newMove = getRandomMove(availableMoves);
      setMoves(newMove);
      lastMove = newMove;
      pos = getNewPos(pos, newMove);
    }
    setFinish(pos.row, pos.col);
  };

  const renderCells = (rowNumber) => {
    const cells = [];

    if (rowNumber === "columns") {
      for (let i = 0; i < columnsQ; i++) {
        let id = `cell_${rowNumber}_${i}`;
        cells.push(
          <div className="grid_column_number" id={id} key={id}>
            {String.fromCharCode(i + 97)}
          </div>
        );
      }
    } else {
      cells.push(
        <div className="grid_row_number" key="grid_row_number">
          {rowNumber + 1}
        </div>
      );
      for (let i = 0; i < columnsQ; i++) {
        cells.push(
          <Cell
            currentStart={currentStart}
            id={`cell_${rowNumber}_${i}`}
            row={rowNumber}
            col={i}
            renderMoves={renderMoves}
          />
        );
      }
    }
    return cells;
  };

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < rowsQ; i++) {
      let id = `row_${i}`;
      rows.push(
        <div className="grid_row" id={id} key={id}>
          {renderCells(i)}
        </div>
      );
    }
    rows.push(
      <div className="grid_columns_row" key="grid_columns_row">
        {renderCells("columns")}
      </div>
    );
    return rows;
  };

  const getStartPosition = () => {
    const row = getRandom(rowsQ);
    const col = getRandom(columnsQ);
    setStart(row, col);
  };

  useEffect(() => {
    if (newGame && !currentStart.row) {
      getStartPosition();
    }
  }, [newGame, currentStart]);

  return (
    <div className="grid_container">
      {renderGrid()}
      <Message newGame={newGame} />
    </div>
  );
}

export default Grid;
