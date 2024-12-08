import { FC, useState } from "react";
import { TodoContext, TodoProps } from "./TodoContext";

export const TodoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const addTodo = (todo: TodoProps) => {};
  const editTodo = (todo: TodoProps) => {};
  const deleteTodo = (todo: TodoProps) => {};
  
  return (
    <TodoContext.Provider value={{ todos, setTodos, addTodo, editTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
