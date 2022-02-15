import { useEffect, useState } from "react";
import Board from "./Board";

const ConnectBoard = () => {
    const [board, setBoard] = useState(new Array(7).fill(new Array(6).fill(null)))
    const [player, setPlayer] = useState('Red')
    const [winner, setWinner] = useState('')

    //handling onclick of the box.
    const handleClick = (boxIndex)  => {
        if(winner === ''){
          makeMove(boxIndex)
        }
    }

    //onclick of the box inserting the token into the array index
    const makeMove = (boxIndex) => {
        const boardCopy = board.map(function(arr) {
          return arr.slice();
        });
        if( boardCopy[boxIndex].indexOf(null) !== -1 ){
          let newBox = boardCopy[boxIndex].reverse()
          newBox[newBox.indexOf(null)] = player
          newBox.reverse()
          setPlayer((player === 'Red') ? 'Blue' : 'Red')
          setBoard(boardCopy)
        }
    }

    //checking line if 4 same tokens are in a line
    const checkLine = (a,b,c,d) =>{
        return ((a !== null) && (a === b) && (a === c) && (a === d));
    }

    //checking for winner, looping through the combinations.Checking Vertical,Horizontal,Diagonal
    const checkWinner = (bs)  => {
        for (let c = 0; c < 7; c++)
            for (let r = 0; r < 4; r++)
                if (checkLine(bs[c][r], bs[c][r+1], bs[c][r+2], bs[c][r+3]))
                    return bs[c][r] + ' wins!'
    
        for (let r = 0; r < 6; r++)
             for (let c = 0; c < 4; c++)
                 if (checkLine(bs[c][r], bs[c+1][r], bs[c+2][r], bs[c+3][r]))
                     return bs[c][r] + ' wins!'
    
        for (let r = 0; r < 3; r++)
             for (let c = 0; c < 4; c++)
                 if (checkLine(bs[c][r], bs[c+1][r+1], bs[c+2][r+2], bs[c+3][r+3]))
                     return bs[c][r] + ' wins!'
    
        for (let r = 0; r < 4; r++)
             for (let c = 3; c < 6; c++)
                 if (checkLine(bs[c][r], bs[c-1][r+1], bs[c-2][r+2], bs[c-3][r+3]))
                     return bs[c][r] + ' wins!'
    
        return "";
    }

    //if checkwinner returns winner setting winner state.
    useEffect(() => {
        let final = checkWinner(board)
        if(final !== winner){
            setWinner(final)
        }
    })

    return(
        <div>
            <div className="Board">
                {[...Array(board.length)].map((x, i) => 
                    <Board 
                        key={i}
                        box={board[i]}
                        handleClick={() => handleClick(i)}
                    ></Board> 
                )}
            </div>
            <button onClick={() => {
                setBoard(new Array(7).fill(new Array(6).fill(null)))
            }}>Reset Game</button>
            <div className={winner !== "" ? "message appear" : "message"}>{winner}</div>     
        </div>
    )
}

export default ConnectBoard;