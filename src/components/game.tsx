import React, { useState } from "react";

// 3x3 grid where player1 and player2 can put o or x and can edit it too by click them
function Game({ player1, player2 }: { player1: string; player2: string }) {

    type cell = null | true | false
  const [grid, setGrid] = useState([
    [null as cell, null as cell, null as cell],
    [null as cell, null as cell, null as cell],
    [null as cell, null as cell, null as cell],
  ]);

  const [turn, setTurn] = useState(true)

  const changeCellState = (row, col) =>{
    
    const newGrid = grid;
    newGrid[row][col] = turn;
    setTurn(!turn)
  }

  return (
    <div>
      <div className="flex">
        {grid[0].map((cell, i) => (
          <Cell setState={changeCellState} cellState={cell} position={[0, i]} />
        ))}
      </div>
      <div className="flex">
        {grid[1].map((cell, i) => (
          <Cell setState={changeCellState} cellState={cell} position={[0, i]} />
        ))}
      </div>
      <div className="flex">
        {grid[2].map((cell, i) => (
          <Cell setState={changeCellState} cellState={cell} position={[0, i]} />
        ))}
      </div>
    </div>
  );
}


export default Game;

const Cell = ({ setState, cellState, position }) => {
  return (
    <div className="border-4  h-24 w-24 cursor-pointer"
        onClick={setState(position[0], position[1])}
    >
      {cellState === true && <div className="flex items-center justify-center text-6xl h-full w-full">o</div>}
      {cellState === false && <div className="flex items-center justify-center text-6xl h-full w-full">x</div>}
      {cellState === true && <div className="flex items-center justify-center text-6xl h-full w-full"></div>}
    </div>
  );
};
