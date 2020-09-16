import React from "react";
import {connect} from 'react-redux'
import {addTodoAction} from "../../redux/actions/todo/todo-actions";
import {TodoStateModel} from "../../redux/models/todos";
import {Dispatch} from "redux";
import {fetchUser} from "../../redux/actions/user/user-actions";


interface Iprop {
    todos: TodoStateModel[]
    fetchUser: (param: any) => any;
    toggleTodo: (param: any) => any;
}

interface IState {
    todos: TodoStateModel[]
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleTodo: id => dispatch(addTodoAction(id)),
    fetchUser: (name) => dispatch(fetchUser(name))
});

const mapStateToProps = state => {
    return ({
        todos: state.todos
    });
};

// @ts-ignore
@connect(
    (state: IState): IState => ({todos: state.todos}),
    (dispatch: Dispatch) => {
        return ({
            toggleTodo: id => dispatch(addTodoAction(id)),
            fetchUser: (name) => dispatch(fetchUser(name))
        });
    }
)
export class Todo extends React.Component<Iprop>{
    render() {
        const { todos, toggleTodo, fetchUser } = this.props;
        return <button onClick={() => fetchUser('dww')}>
            Add Todos
            {(todos && todos.length) || 0}
        </button>;
    }
}
