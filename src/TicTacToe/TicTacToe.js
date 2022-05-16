import React, {useState} from 'react'
import './TicTacToe.css'; // links to stylesheet

const TicTacToe = () => {
    const [turn, setTurn] = useState('x'); // creating alternating turns - default 1st player is x
    const [cells, setCells] = useState(Array(9).fill('')); // track the items that are clicked = set array of 9 items because 3x3 grid then set to an empty string that will be filled with x or o
    const [winner, setWinner] = useState(); //

    //checkForWinner stores the winner combinations 
    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],

            down:   [
                [0,3,6],
                [1,4,7],
                [2,5,8],
            ],

            diagnol: [
                [0,4,8],
                [2,4,6],
            ],
        };

        // loops through each of the item in the squares array and check if they match the winning combo 
        for(let combo in combos) {
            combos[combo].forEach((pattern) => {
               if (

                   squares[pattern[0]] === '' ||
                   squares[pattern[1]] === '' ||
                   squares[pattern[2]] === ''
               ) {
                   // do nothing
               } else if (
                   squares[pattern[0]] === squares[pattern[1]] &&
                   squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
               }
            });
        }
    };

    //prevents the double click and notify the user when double click occurs 
    const handleClick = (num) => {
        if(cells[num] !== '') {
            alert('already clicked');
            return;
        }


        let squares = [...cells]; // copying cells array into squares provided by the var at the top

        // adding logic to alternate the turns for turn text
        if (turn === 'x') {
            squares[num] = 'x';
            setTurn ('o');
        } else {
            squares[num] = 'o';
            setTurn('x');
        }

    
        checkForWinner(squares); //
        setCells(squares); // update the state variable maintains the item in the array and remember what is clicked 
    };

    // logic to restart the cells when button is clicked 
    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }
    
    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    }

    

  return (
    <div className="container"> {/* css container display flex - center */}
        <table>
            Turn: {turn}
            <tbody>
                <tr>
                    <Cell num={0}/>
                    <Cell num={1}/>
                    <Cell num={2}/>
                </tr>
                <tr>
                    <Cell num={3}/>
                    <Cell num={4}/>
                    <Cell num={5}/>
                </tr>
                <tr>
                    <Cell num={6}/>
                    <Cell num={7}/>
                    <Cell num={8}/>
                    {/* numbered all the cells to track which cell is clicked */}
                </tr>
            </tbody>
        </table> 
        {/* 3 by 3 grid layout  */}
        {winner && (
            <>
                <p>{winner} is the winner!</p>
                <button onClick={() => handleRestart()}>Play Again!</button>
            </>
        )}
    </div>
  )
}

export default TicTacToe;