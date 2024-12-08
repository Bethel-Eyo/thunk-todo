import { FC, useEffect, useState } from "react";
import { TodoContext, TodoProps } from "./TodoContext";
import * as SecureStore from "expo-secure-store";

export const TodoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const STORE_ACCESS_KEY = "todos";

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todoListString = await SecureStore.getItemAsync(STORE_ACCESS_KEY);
        const todos: TodoProps[] = todoListString ? JSON.parse(todoListString) : [];
        setTodos(todos);
      } catch (error) {
        console.debug(error);
      }
    };

    getTodos();
  }, []);

  const storeTodosUpdate = async (todos: TodoProps[]) => {
    try {
      await SecureStore.setItemAsync(STORE_ACCESS_KEY, JSON.stringify(todos));
      setTodos(todos);
    } catch (error) {
      console.debug(error);
    }
  };

  const addTodo = (todo: TodoProps) => {
    const newTodos = [...todos, todo];
    storeTodosUpdate(newTodos);
  };

  const editTodo = async (todo: TodoProps) => {
    const updatedTodos = todos.map((prevTodo) => (todo.id === prevTodo.id ? todo : prevTodo));
    storeTodosUpdate(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    storeTodosUpdate(remainingTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, addTodo, editTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
