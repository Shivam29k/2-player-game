import { useState } from "react";
import "./App.css";
import Game from "./components/game";

function App () {
  
  // const [name, setname] = useState["noob1", "noob2"]
  // const [gameState, setGameState] = useState(false) 

  // wanted to show a form which will take the names and then we will start the game but no time

  return (

    <div className="bg-gray-500 h-screen text-white">
      <h1 className="text-center text-4xl font-bold py-4">Tic Tak Toe</h1>

      <div className="flex items-center justify-center">
      <Game player1="noob1" player2="boob2" />
      </div>
    </div>

  );
}

export default App;
