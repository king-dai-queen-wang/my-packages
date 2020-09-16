import React from "react";
import './Square.scss';

interface IProps {
    value: string | null;
    onClick: () => {} | void;
}

export function Square(props: IProps) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
