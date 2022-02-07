import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="App">
    <Link to="/new-game">New game</Link>
  </div>
);

export default Home;
