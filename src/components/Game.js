import React from "react";
import { Loop, Stage, World, TileMap } from "react-game-kit";



const Game = ({ children }) => (
  <Loop>
    <Stage width={1024} height={800}>
      <World>
        {children}
      </World>
    </Stage>
  </Loop>
);

export default Game;
