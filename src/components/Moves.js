import { useSelector, useDispatch } from "react-redux";

import { setIsReady } from "../store/gameSlice";

import "./scss/moves.scss";

import arrow from "../assets/images/arrow.png";

function Moves() {
  const movesSuccession = useSelector((state) => state.grid.movesSuccession);

  const dispatch = useDispatch();
  const setReady = (bool) => dispatch(setIsReady(bool));

  const getReady = (e) => {
    if (e.target.id !== `move_${movesSuccession.length-1}`) return;
    setReady(true);
  }

  const renderMoves = () => {
    if (movesSuccession.length === 0) return;
    return movesSuccession.map((move, idx) => {
      let id = `move_${idx}`;
      return (
        <div className={`move_direction ${move}`} key={id}>
          <img
            src={arrow}
            className="move_arrow"
            id={id}
            draggable={false}
            alt=""
            onAnimationEnd={(e) => getReady(e)}
          />
        </div>
      );
    });
  };

  return <div className="moves_container">{renderMoves()}</div>;
}

export default Moves;
