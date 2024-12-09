import { FC } from "react";
import TodoContext from "./TodoContext";
import useTodoProviderLogic from "./useTodoProviderLogic";

const TodoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addTodo, editTodo, deleteTodo, todos, completedTodos, uncompletedTodos, setTodos } =
    useTodoProviderLogic();

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, addTodo, editTodo, deleteTodo, completedTodos, uncompletedTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
