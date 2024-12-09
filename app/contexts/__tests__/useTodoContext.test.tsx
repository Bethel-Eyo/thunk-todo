import { render } from "@testing-library/react-native";
import TodoProvider from "../TodoProvider";
import useTodoContext from "../useTodoContext";
import { Text } from "react-native"

// A mock component that uses the `useTodoContext` hook
const MockComponent = () => {
  const context = useTodoContext();
  return (
    <>{context ? <Text>{context.todos.length}</Text> : null}</>
  );
};

describe("useTodoContext", () => {
  it("returns the correct context value when used inside a TodoProvider", () => {
    const { getByText } = render(
      <TodoProvider>
        <MockComponent />
      </TodoProvider>
    );

    // Assuming the TodoContext provides a 'todos' array, initially empty
    expect(getByText("0")).toBeTruthy();  // Expect it to render the number of todos
  });

  it("throws an error when used outside of a TodoProvider", () => {
    // Wrap the component with an expect to throw to check for errors
    expect(() => render(<MockComponent />)).toThrowError(
      "useTodoContext must be used within a TodoProvider"
    );
  });
});
