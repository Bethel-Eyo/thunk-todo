import { render, fireEvent } from "@testing-library/react-native";
import { Text, Button } from "react-native";
import TodoProvider from "../TodoProvider";
import useTodoContext from "../useTodoContext";

// Mock component to consume the context values
const MockComponent = () => {
  const { todos, addTodo, deleteTodo } = useTodoContext();

  return (
    <>
      <Text testID="todo-count">{todos.length}</Text>
      <Button
        title="Add Todo"
        onPress={() => addTodo({ title: "New Todo", completed: false, id: "1" })}
      />
      <Button
        title="Delete Todo"
        onPress={() => deleteTodo("1")}
      />
    </>
  );
};

describe("TodoProvider", () => {
  it("provides the correct context values", () => {
    const { getByTestId } = render(
      <TodoProvider>
        <MockComponent />
      </TodoProvider>
    );

    // Initially, there are no todos
    expect(getByTestId("todo-count").children[0]).toBe("0");
  });

  it("deletes a todo", () => {
    const { getByTestId, getByText } = render(
      <TodoProvider>
        <MockComponent />
      </TodoProvider>
    );

    // First, add a todo
    fireEvent.press(getByText("Add Todo"));

    // Now delete it
    fireEvent.press(getByText("Delete Todo"));

    // After deletion, there should be 0 todos
    expect(getByTestId("todo-count").children[0]).toBe("0");
  });
});
