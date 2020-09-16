import {TodoStateModel} from "../../models/todos";
import {TodoActionEnum} from "../../enum/todos/todo-action.enum";

export interface TodoActionInterface {
    id?: any
    type: any;
    payload?: any;
    text?: string;
    name: string;
}

export const todos = (state: TodoStateModel[] = [], action: TodoActionInterface) => {
    switch (action.type) {
        case TodoActionEnum.ADD_TODO: {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        }
        case TodoActionEnum.TOGGLE_TODO: {
            return state.map(item => item.id === action.id ?
                {...item, completed: true } : item)
        }
        default: return state;
    }
};
