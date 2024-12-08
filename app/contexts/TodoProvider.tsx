import { FC, useState } from "react";
import { TodoContext, TodoProps } from "./TodoContext";

export const TodoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const addTodo = (todo: TodoProps) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const editTodo = (todo: TodoProps) => {
    const updatedTodos = todos.map((prevTodo) => (todo.id === prevTodo.id ? todo : prevTodo));
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, addTodo, editTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
