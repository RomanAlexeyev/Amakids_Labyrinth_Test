import arrow from "../assets/images/arrow.png";

import "./scss/logo.scss";

function Logo() {
  return (
    <div className="logo_container">
      <img src={arrow} className="arrow" id="arrow_left" draggable={false} alt="" />
      <span id="logo_name">ЛАБИРИНТ</span>
      <img src={arrow} className="arrow" id="arrow_right" draggable={false} alt="" />
    </div>
  );
}

export default Logo;
