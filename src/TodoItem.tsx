import React, {useContext} from "react";

import {TodoStore} from "./Store";
import {TodoItem as TodoType} from "./types";

interface TodoItemProps {
	item: TodoType;
	index: number;
}

const EmptyBox = () => <i className="fas fa-2x fa-square" />;
const CheckedBox = () => <i className="fas fa-2x fa-check-square" />;

export default function TodoItem(props: TodoItemProps) {
	const [, {toggleChecked}] = useContext(TodoStore);
	const styles = props.item.checked ? {color: '#888', textDecoration: 'line-through'} : {};

	function toggle() {
		toggleChecked(props.index);
	}

	return (
		<li>
			<span className="fa-li" style={{cursor: "pointer"}} onClick={toggle}>
				{props.item.checked ? <CheckedBox /> : <EmptyBox />}
			</span>
			<span style={styles}>{props.item.value}</span>
		</li>
	);
}