import "./App.css";
import Game from "./components/game";

function App () {
  return (

    <div className="bg-gray-500 h-screen text-white">
      <h1 className="text-center text-4xl font-bold py-4">Tic Tak Toe</h1>
      <div className="flex items-center justify-center">
      <Game player1="Shivam" player2="shivam2" />
      </div>
    </div>

  );
}

export default App;
