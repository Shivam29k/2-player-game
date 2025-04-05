import React, { useState, useCallback } from "react";

// 3x3 grid where player1 and player2 can put o or x and can edit it too by click them
function Game({ player1, player2 }: { player1: string; player2: string }) {
    type Cell = null | true | false;
    type Grid = Cell[][];

    const [grid, setGrid] = useState<Grid>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const [turn, setTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState(false);

    const checkWinner = (grid: Grid): boolean => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (grid[i][0] !== null && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
                return true;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (grid[0][i] !== null && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
                return true;
            }
        }
        // Check diagonals
        if (grid[0][0] !== null && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
            return true;
        }
        if (grid[0][2] !== null && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
            return true;
        }
        return false;
    };

    const checkDraw = (grid: Grid): boolean => {
        return grid.every(row => row.every(cell => cell !== null));
    };

    const changeCellState = useCallback((row: number, col: number) => {
        if (winner || isDraw || grid[row][col] !== null) return;

        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = turn;
        setGrid(newGrid);

        if (checkWinner(newGrid)) {
            setWinner(turn ? player1 : player2);
        } else if (checkDraw(newGrid)) {
            setIsDraw(true);
        } else {
            setTurn(!turn);
        }
    }, [grid, turn, winner, isDraw, player1, player2]);

    const resetGame = () => {
        setGrid([
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]);
        setTurn(true);
        setWinner(null);
        setIsDraw(false);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {!winner && !isDraw && (
                <div className="text-2xl mb-4">
                    Current turn: {turn ? player1 : player2}
                </div>
            )}
            {winner && (
                <div className="text-2xl mb-4">
                    Winner: {winner}!
                </div>
            )}
            {isDraw && (
                <div className="text-2xl mb-4">
                    Game is a draw!
                </div>
            )}
            <div className="flex flex-col">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                setState={changeCellState}
                                cellState={cell}
                                position={[rowIndex, colIndex]}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {(winner || isDraw) && (
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={resetGame}
                >
                    Play Again
                </button>
            )}
        </div>
    );
}

export default Game;

interface CellProps {
    setState: (row: number, col: number) => void;
    cellState: null | boolean;
    position: [number, number];
}

const Cell: React.FC<CellProps> = ({ setState, cellState, position }) => {
    return (
        <div 
            className="border-2 border-gray-400 h-24 w-24 cursor-pointer hover:bg-black/20"
            onClick={() => setState(position[0], position[1])}
        >
            {cellState === true && <div className="flex items-center justify-center text-6xl h-full w-full text-green-300">O</div>}
            {cellState === false && <div className="flex items-center justify-center text-6xl h-full w-full text-red-300">X</div>}
            {cellState === null && <div className="flex items-center justify-center text-6xl h-full w-full"></div>}
        </div>
    );
};
