import React, {useContext, useState, ChangeEvent, FormEvent} from "react";

import {TodoStore} from "./Store";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const [{todos}, {addTodo}] = useContext(TodoStore);
	const [newTodo, setNewTodo] = useState("");

	function updateTodo(e: ChangeEvent<HTMLInputElement>) {
		setNewTodo(e.target.value);
	}

	function addNewTodo(e: FormEvent) {
		e.preventDefault();
		if (newTodo) {
			addTodo(newTodo);
			setNewTodo("");
		}
		return false;
	}

	function onPlusClick() {
		if (newTodo) {
			addTodo(newTodo);
			setNewTodo("");
		}
	}

	return (
		<form onSubmit={addNewTodo}>
			<ul className="fa-ul">
				{todos.map((todo, i) => <TodoItem item={todo} index={i} key={i} />)}
				<li>
					<span className="fa-li" onClick={onPlusClick} style={{cursor: 'pointer'}}>
						<i className="fas fa-plus fa-2x" />
					</span>
					<input onChange={updateTodo} value={newTodo} />
				</li>
			</ul>
		</form>
	);
}