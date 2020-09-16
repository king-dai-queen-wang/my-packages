import React from "react";
import './Game.scss';
import {Board} from "../board/Board";
import {History} from "../history/History";

interface IProps {
    squares?: number[];
    onClick?: (param ?: number) => {}
}
interface IStates {
    history: {squares: (string | null)[]}[];
    xIsNext: boolean;
    stepNumber: number;
}

export class Game extends React.Component<IProps, IStates> {
    constructor(props){
        super(props);
        this.state = {
            stepNumber: 0,
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    handleClick(i) {
        const history: ({squares: (string | null)[]})[] = this.state.history.slice(0, this.state.stepNumber + 1);
        const current: {squares: (string | null)[]}= history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length});
    }

    rebackStep(step: number): void {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        let status: string | null = null;
        const winner = calculateWinner(current.squares);
        if(winner){
            status = 'winner is '+ winner;
        } else {
            status = 'Next player: '+ (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <History history={history} onClick={(i) => this.rebackStep(i)}/>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const winnerMap = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    let winner = null;

    winnerMap.some(([a,b,c]) => {
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner = squares[a];
            return true;
        }
        return false;
    });
    return winner;
}
