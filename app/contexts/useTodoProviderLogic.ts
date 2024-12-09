import { useState, useEffect, useMemo } from "react";
import { TodoProps } from "./TodoContext";
import * as SecureStore from "expo-secure-store";

const useTodoProviderLogic = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const STORE_ACCESS_KEY = "todos";
  const [completedTodos, setCompletedTodos] = useState<TodoProps[]>([]);
  const [uncompletedTodos, setUncompletedTodos] = useState<TodoProps[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todoListString = await SecureStore.getItemAsync(STORE_ACCESS_KEY);
        const todos: TodoProps[] = todoListString ? JSON.parse(todoListString) : [];
        updateStates(todos);
      } catch (error) {
        console.debug(error);
      }
    };

    getTodos();
  }, []);

  const updateStates = (todos: TodoProps[]) => {
    setTodos(todos);
    const todosCompleted = todos.filter((todo) => todo.completed === true);
    const todosNotCompleted = todos.filter((todo) => todo.completed === false);
    setCompletedTodos(todosCompleted);
    setUncompletedTodos(todosNotCompleted);
  };

  const storeTodosUpdate = async (todos: TodoProps[]) => {
    try {
      await SecureStore.setItemAsync(STORE_ACCESS_KEY, JSON.stringify(todos));
      updateStates(todos);
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

  return useMemo(
    () => ({ addTodo, editTodo, deleteTodo, todos, completedTodos, uncompletedTodos, setTodos }),
    [addTodo, editTodo, deleteTodo, todos, completedTodos, uncompletedTodos, setTodos]
  );
};

export default useTodoProviderLogic;
