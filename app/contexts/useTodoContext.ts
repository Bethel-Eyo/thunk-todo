import { useContext } from "react";
import TodoContext from "./TodoContext";

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export default useTodoContext;
