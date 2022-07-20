import { useSelector, useDispatch } from "react-redux";

import "./scss/message.scss";

import { resetMoves } from "../store/gridSlice";
import { setNewGame, setChoiceIsMade, setIsWinner } from "../store/gameSlice";

function Message({ newGame }) {
  const dispatch = useDispatch();
  const reset = () => dispatch(resetMoves());
  const setGame = (bool) => dispatch(setNewGame(bool));
  const setChoice = (bool) => dispatch(setChoiceIsMade(bool));
  const setWinner = (bool) => dispatch(setIsWinner(bool));

  const choiceIsMade = useSelector((state) => state.game.choiceIsMade);
  const isWinner = useSelector((state) => state.game.isWinner);

  const freshStart = () => {
    reset();
    setGame(true);
    setWinner(false);
    setChoice(false);
  };

  const getContent = () => {
    if (!newGame) {
      return <button onClick={() => setGame(true)}>Начать</button>;
    } else {
      return (
        <>
          <div className={`winner_message ${isWinner ? "win" : "lose"}`}>
            {isWinner ? "Вы выиграли!" : "Вы проиграли"}
          </div>
          <div className={`winner_icon ${isWinner ? "win" : "lose"}`}></div>
          <button onClick={() => freshStart()}>Еще раз</button>
        </>
      );
    }
  };

  if (newGame && !choiceIsMade) return null;

  return (
    <div className="message_container">
      <div className="message_content">{getContent()}</div>
    </div>
  );
}

export default Message;
