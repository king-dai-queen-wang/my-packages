import React from "react";

interface IState {
    date: Date;
}
export class Clock extends React.Component <Object, IState>{
    timeId;
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    componentDidMount() {
        this.timeId = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    render() {
        return (
            <div>
                <h2>Clock</h2>
                <p>{this.state.date.toLocaleTimeString()}</p>
            </div>

        );
    }
}
