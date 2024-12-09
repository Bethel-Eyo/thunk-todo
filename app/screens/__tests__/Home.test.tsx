import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Animated } from "react-native";
import TodoProvider from "../../contexts/TodoProvider";
import Home from "../Home";
import useHomeLogic from "../useHomeLogic";

// Mock `useHomeLogic` to control its behavior in tests
jest.mock("../useHomeLogic");

jest.mock("expo-font", () => ({
  Font: {
    isLoaded: true,
  },
  useFonts: jest.fn().mockReturnValue([true]),
}));

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

global.jest = require('jest-mock');

const mockedUseHomeLogic = useHomeLogic as jest.MockedFunction<typeof useHomeLogic>;

describe("Home Screen", () => {
  beforeEach(() => {
    mockedUseHomeLogic.mockReturnValue({
      todos: [
        { id: "1", title: "Todo 1", completed: false },
        { id: "2", title: "Todo 2", completed: true },
      ],
      completedTodos: [{ id: "2", title: "Todo 2", completed: true }],
      uncompletedTodos: [{ id: "1", title: "Todo 1", completed: false }],
      selectedOption: "All",
      modalVisible: false,
      options: ["All", "Completed", "Uncompleted"],
      markAsCompleted: jest.fn(),
      add: jest.fn(),
      closeModal: jest.fn(),
      setSelectedOption: jest.fn(),
      title: "",
      setTitle: jest.fn(),
      slideAnim: {} as Animated.Value,
    });

    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("Renders screen title", () => {
    const { getByText } = render(
      <TodoProvider>
        <Home />
      </TodoProvider>
    );

    // Check that the title is rendered
    expect(getByText("Thunk's todos")).toBeTruthy();
  });

  it("adds a new todo when the add button is pressed", () => {
    mockedUseHomeLogic.mockReturnValue({
      ...mockedUseHomeLogic(),
      title: "New Todo",
    });

    const { getByText } = render(
      <TodoProvider>
        <Home />
      </TodoProvider>
    );

    const addButton = getByText("+");
    fireEvent.press(addButton);

    // Check that the add function is called
    expect(mockedUseHomeLogic().add).toHaveBeenCalled();
  });

  it("updates selected option when a filter is clicked", () => {
    const { getByText } = render(
      <TodoProvider>
        <Home />
      </TodoProvider>
    );

    const completedFilter = getByText("Completed");
    fireEvent.press(completedFilter);

    // Check that `setSelectedOption` is called with "Completed"
    expect(mockedUseHomeLogic().setSelectedOption).toHaveBeenCalledWith("Completed");
  });

  it("shows the modal when modalVisible is true", () => {
    mockedUseHomeLogic.mockReturnValue({
      ...mockedUseHomeLogic(),
      modalVisible: true,
    });

    const { getByTestId } = render(
      <TodoProvider>
        <Home />
      </TodoProvider>
    );
    const modal = getByTestId("animated-modal");

    expect(modal).toBeTruthy();
  });
});
