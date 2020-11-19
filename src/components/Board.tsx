import React from "react"
import { ISquare } from "../interface";
import Square from "./Square";
import "./Refactor.css"

interface BoardProps {
  squares: ISquare[]
  onClick: (i: number) => void
}

const Board: React.FC<BoardProps> = props => {
  // const renderSquare = (i: number) => {
  //   return (
  //     <Square
  //       value={props.squares[i]}
  //       onClick={() => props.onClick(i)}
  //     />
  //   )
  // }
  return (
    <div>
      {[...Array(3)].map((_, i) => {
        return (
          <div className="board-row" key={i}>
            {[...Array(3)].map((_,j) => {
              const index: number =  3 * i + j
              return (
                <Square
                  value={props.squares[index]}
                  onClick={() => props.onClick(index)}
                  key={j}
                ></Square>
              )
            })}
          </div>
        )
      })}
      {/* <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div> */}
    </div>
  )
}

export default Board
