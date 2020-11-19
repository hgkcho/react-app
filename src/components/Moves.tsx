import React  from "react";
import { History } from "../interface"

type MoveProps = {
  history: History[]
  jumpTo: (move:number) => void
}

const Moves: React.FC<MoveProps> = (props) => {

  return (
    <ol>
      {props.history.map((_, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => props.jumpTo(move)}>{desc}</button>

          </li>
        )
      })}
    </ol>

  )
}

export default Moves