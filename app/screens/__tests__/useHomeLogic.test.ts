import { TodoContextProps } from "@/app/contexts/TodoContext";
import TodoProvider from "@/app/contexts/TodoProvider";
import * as useTodoContext from "@/app/contexts/useTodoContext";
import { act, renderHook } from "@testing-library/react-native";
import useHomeLogic from "../useHomeLogic";

const mockContextValue: TodoContextProps = {
  todos: [],
  completedTodos: [],
  uncompletedTodos: [],
  addTodo: jest.fn(),
  editTodo: jest.fn(),
  setTodos: jest.fn(),
  deleteTodo: jest.fn(),
};

describe("useHomeLogic", () => {
  beforeEach(() => {
    jest.spyOn(useTodoContext, "default").mockReturnValue(mockContextValue);
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should return the correct initial state", () => {
    const { result } = renderHook(() => useHomeLogic(), {
      wrapper: TodoProvider,
    });

    // Test initial values
    expect(result.current.todos).toEqual([]);
    expect(result.current.completedTodos).toEqual([]);
    expect(result.current.uncompletedTodos).toEqual([]);
    expect(result.current.selectedOption).toBe("All");
    expect(result.current.modalVisible).toBe(false);
    expect(result.current.title).toBeUndefined();
  });

  it("should add a new todo when the add function is called", async () => {
    const { result } = renderHook(() => useHomeLogic());

    // Simulate typing a title and adding the todo
    act(() => {
      result.current.setTitle("New Todo");
    });

    act(() => {
      result.current.add();
    });

    expect(mockContextValue.addTodo).toHaveBeenCalledWith({
      title: "New Todo",
      completed: false,
      id: expect.any(String), // ensure the ID is a string, generated dynamically
    });
  });

  it("should toggle the completion status of a todo when markAsCompleted is called", async () => {
    const { result } = renderHook(() => useHomeLogic(), {
      wrapper: TodoProvider,
    });

    const mockTodo = { id: "1", title: "Todo 1", completed: false };

    // Simulate marking a todo as completed
    act(() => {
      result.current.markAsCompleted(mockTodo);
    });

    expect(mockContextValue.editTodo).toHaveBeenCalledWith({
      ...mockTodo,
      completed: true,
    });
  });

  it("should correctly filter todos based on selected option", () => {
    const { result } = renderHook(() => useHomeLogic(), {
      wrapper: TodoProvider,
    });

    // Simulate changing the selected option to "Completed"
    act(() => {
      result.current.setSelectedOption("Completed");
    });

    expect(result.current.selectedOption).toBe("Completed");
    expect(result.current.todos).toEqual(result.current.completedTodos);
  });

  it("should handle title change correctly", () => {
    const { result } = renderHook(() => useHomeLogic(), {
      wrapper: TodoProvider,
    });

    // Simulate changing the title
    act(() => {
      result.current.setTitle("New Todo");
    });

    expect(result.current.title).toBe("New Todo");
  });
});
