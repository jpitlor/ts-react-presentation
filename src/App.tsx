import React, {useContext} from "react";

import {TodoStore} from "./Store";
import TodoList from "./TodoList";

export default function App() {
	return (
		<div>
			<h1>My Todo List</h1>
			<TodoList />
		</div>
	);
}