import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import TodoItem from "../TodoItem/TodoItem"; // Adjust the import path if necessary
import * as useTodoItemLogic from "../TodoItem/useTodoItemLogic";

// Mocking the hook used inside TodoItem
jest.mock("../TodoItem/useTodoItemLogic");

jest.mock("expo-font", () => ({
  Font: {
    isLoaded: true,
  },
  useFonts: jest.fn().mockReturnValue([true]),
}));

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

global.jest = require("jest-mock");

describe("TodoItem Component", () => {
  const mockDeleteTodo = jest.fn();
  const mockSetText = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    // Resetting mocks before each test
    mockDeleteTodo.mockReset();
    mockSetText.mockReset();
    mockOnSave.mockReset();
    mockOnEdit.mockReset();

    // Mock the hook to return controlled values
    jest.spyOn(useTodoItemLogic, "default").mockReturnValue({
      deleteTodo: mockDeleteTodo,
      editable: false,
      setText: mockSetText,
      onSave: mockOnSave,
      onEdit: mockOnEdit,
      text: "Test Todo",
      textInputRef: { current: null },
    });
  });

  it("renders the todo item with correct title and status", () => {
    render(<TodoItem id="1" title="Test Todo" completed={false} />);

    // Check that the title is rendered
    expect(screen.getByTestId("ListTextInput-1")).toBeTruthy();
    // Ensure no done icon is shown for non-completed todos
    expect(screen.queryByText("done")).toBeNull();
  });

  it("shows the 'edit' icon when editable is false", () => {
    render(<TodoItem id="1" title="Test Todo" completed={false} />);

    // Ensure the edit icon is visible when editable is false
    const editButton = screen.getByTestId("edit-icon");
    expect(editButton).toBeTruthy();
  });

  it("shows the 'save' icon when editable is true", () => {
    // Mock editable to be true
    jest.spyOn(useTodoItemLogic, "default").mockReturnValue({
      deleteTodo: mockDeleteTodo,
      editable: true,
      setText: mockSetText,
      onSave: mockOnSave,
      onEdit: mockOnEdit,
      text: "Test Todo",
      textInputRef: { current: null },
    });

    render(<TodoItem id="1" title="Test Todo" completed={false} />);

    // Ensure the save icon is visible when editable is true
    const saveButton = screen.getByTestId("save-icon");
    expect(saveButton).toBeTruthy();
  });

  it("calls onSave when save button is pressed", () => {
    // Mock editable to be true
    jest.spyOn(useTodoItemLogic, "default").mockReturnValue({
      deleteTodo: mockDeleteTodo,
      editable: true,
      setText: mockSetText,
      onSave: mockOnSave,
      onEdit: mockOnEdit,
      text: "Test Todo",
      textInputRef: { current: null },
    });

    render(<TodoItem id="1" title="Test Todo" completed={false} />);

    const saveButton = screen.getByTestId("save-icon");
    fireEvent.press(saveButton);

    // Ensure onSave function is called when the save button is pressed
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("calls deleteTodo when delete icon is pressed", () => {
    render(<TodoItem id="1" title="Test Todo" completed={false} />);

    const deleteButton = screen.getByTestId("delete-icon");
    fireEvent.press(deleteButton);

    // Ensure deleteTodo function is called when the delete button is pressed
    expect(mockDeleteTodo).toHaveBeenCalledWith("1");
  });

  it("displays the tip text when editable is true", () => {
    // Mock editable to be true
    jest.spyOn(useTodoItemLogic, "default").mockReturnValue({
      deleteTodo: mockDeleteTodo,
      editable: true,
      setText: mockSetText,
      onSave: mockOnSave,
      onEdit: mockOnEdit,
      text: "Test Todo",
      textInputRef: { current: null },
    });

    render(<TodoItem id="1" title="Test Todo" completed={false} />);

    // Ensure the tip text is displayed when editable is true
    expect(screen.getByText("click save icon to save changes after editing")).toBeTruthy();
  });
});
