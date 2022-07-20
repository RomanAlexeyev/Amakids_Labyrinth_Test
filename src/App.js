import "./index.css";

import Logo from "./components/Logo";
import Grid from "./components/Grid";
import Moves from "./components/Moves";

function App() {
  return (
    <div className="master_container">
      <div className="game_container">
        <Logo />
        <Grid />
        <Moves />        
      </div>
    </div>
  );
}

export default App;
