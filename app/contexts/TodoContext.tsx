import React from 'react';
import { createContext } from "react";

export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}
export interface TodoContextProps {
  todos: TodoProps[];
  completedTodos: TodoProps[];
  uncompletedTodos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  addTodo: (todo: TodoProps) => void;
  editTodo: (todo: TodoProps) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextProps | null>(null);

export default TodoContext;
