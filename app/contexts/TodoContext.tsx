import { createContext } from "react";

export interface TodoProps {
  text: string;
  status: boolean;
}
export interface TodoContextProps {
  todos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  addTodo: (todo: TodoProps) => void;
  editTodo: (todo: TodoProps) => void;
  deleteTodo: (todo: TodoProps) => void;
}

export const TodoContext = createContext<TodoContextProps | null>(null);
