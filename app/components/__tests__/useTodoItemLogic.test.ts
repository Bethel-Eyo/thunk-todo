import { TodoContextProps, TodoProps } from '@/app/contexts/TodoContext';
import * as useTodoContext from '@/app/contexts/useTodoContext';
import { renderHook } from '@testing-library/react-native';
import { act } from 'react';
import useTodoItemLogic from '../TodoItem/useTodoItemLogic';

describe('useTodoItemLogic', () => {
  const mockDeleteTodo = jest.fn();
  const mockEditTodo = jest.fn();

  const mockContextValue: TodoContextProps = {
    todos: [],
    completedTodos: [],
    uncompletedTodos: [],
    addTodo: jest.fn(),
    editTodo: mockEditTodo,
    setTodos: jest.fn(),
    deleteTodo: mockDeleteTodo,
  };
  
  // Set up default props
  const defaultProps: TodoProps = {
    id: '1',
    title: 'Test Todo',
    completed: false,
  };

  beforeEach(() => {
    // Reset mocks before each test
    mockDeleteTodo.mockClear();
    mockEditTodo.mockClear();

    // Mock context values
    jest.spyOn(useTodoContext, "default").mockReturnValue(mockContextValue);
  });

  it('should initialize with the correct values', () => {
    const { result } = renderHook(() => useTodoItemLogic(defaultProps));
    
    expect(result.current.text).toBe('Test Todo');
    expect(result.current.editable).toBe(false);
    expect(result.current.textInputRef.current).toBeNull();
  });

  it('should toggle editable state on edit', () => {
    const { result } = renderHook(() => useTodoItemLogic(defaultProps));
    
    act(() => {
      result.current.onEdit();
    });

    expect(result.current.editable).toBe(true);
  });

  it('should delete the todo', () => {
    const { result } = renderHook(() => useTodoItemLogic(defaultProps));
    
    act(() => {
      result.current.deleteTodo(defaultProps.id); // Delete the todo
    });

    expect(mockDeleteTodo).toHaveBeenCalledWith(defaultProps.id);
  });
});
