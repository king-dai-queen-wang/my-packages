import React from "react";
import './History.scss';

interface IProp {
    history: ({squares: (string | null)[]})[];
    onClick: (param: number) => void;
}
interface IState {

}
export class History extends React.Component<IProp, IState> {

    render() {

        const move = this.props.history.map((step, move: number) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (<li key={move} >
                <button onClick={() => this.props.onClick(move)}>
                    {desc}
                </button></li>)
        });

        return (
            <ol>
                {move}
            </ol>
        );
    }
}
