import React, {createContext, useReducer} from "react";

import {TodoItem} from "./types";

// #region Types

interface StoreProps {
	children: React.ReactNode;
}

interface State {
	todos: TodoItem[];
}

enum ActionType {
	ADD = 'add',
	REMOVE = 'remove',
	UPDATE = 'update',
	TOGGLE = 'toggle',
}

interface add {
	type: ActionType.ADD;
	value: string;
}

interface remove {
	type: ActionType.REMOVE;
	i: number;
}

interface update {
	type: ActionType.UPDATE;
	i: number;
	value: string;
}

interface toggle {
	type: ActionType.TOGGLE;
	i: number;
}

type Action = add | remove | update | toggle;

interface Dispatch {
	addTodo: (value: string) => void;
	removeTodo: (i: number) => void;
	updateTodo: (i: number, value: string) => void;
	toggleChecked: (i: number) => void;
}

type TodoStoreType = [State, Dispatch];

// #endregion

const defaultState = {
	todos: [],
}

const actionCreator = (dispatch: (action: Action) => void): Dispatch => ({
	addTodo: (value: string) => dispatch({type: ActionType.ADD, value}),
	removeTodo: (i: number) => dispatch({type: ActionType.REMOVE, i}),
	updateTodo: (i: number, value: string) => dispatch({type: ActionType.UPDATE, i, value}),
	toggleChecked: (i: number) => dispatch({type: ActionType.TOGGLE, i}),
});

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case ActionType.ADD:
			return {...state, todos: [...state.todos, {value: action.value, checked: false}]}
		case ActionType.REMOVE: {
			const todos = [...state.todos];
			todos.splice(action.i, 1);
			return {...state, todos};
		}
		case ActionType.TOGGLE: {
			const todos = [...state.todos];
			const {value, checked} = state.todos[action.i];
			todos.splice(action.i, 1, {value, checked: !checked});
			return {...state, todos};
		}
		case ActionType.UPDATE: {
			const todos = [...state.todos];
			todos.splice(action.i, 1, {value: action.value, checked: false});
			return {...state, todos};
		}
		default:
			return state;
	} 
}

export const TodoStore = createContext<TodoStoreType>([defaultState, actionCreator(() => null)]);

export default function Store(props: StoreProps) {
	const [state, dispatch] = useReducer(reducer, defaultState);
	const actions = actionCreator(dispatch);
	
	return (
		<TodoStore.Provider value={[state, actions]}>
			{props.children}
		</TodoStore.Provider>
	);
}