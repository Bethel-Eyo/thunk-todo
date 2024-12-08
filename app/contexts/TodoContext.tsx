import { createContext } from "react";

export interface TodoProps {
  id: number;
  text: string;
  status: boolean;
}
export interface TodoContextProps {
  todos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  addTodo: (todo: TodoProps) => void;
  editTodo: (todo: TodoProps) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextProps | null>(null);
