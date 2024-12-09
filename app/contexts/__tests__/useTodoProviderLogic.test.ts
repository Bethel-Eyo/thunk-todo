import { renderHook, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import useTodoProviderLogic from '../useTodoProviderLogic';
import { act } from 'react';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

describe('useTodoProviderLogic', () => {
  beforeEach(() => {
    (SecureStore.getItemAsync as jest.Mock).mockClear();
    (SecureStore.setItemAsync as jest.Mock).mockClear();
  });

  it('should load todos from SecureStore on mount', async () => {
    const mockTodos = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true },
    ];

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockTodos));

    const { result } = renderHook(() => useTodoProviderLogic());

    // Use waitFor to ensure that the todos state is updated after async operations
    await waitFor(() => expect(result.current.todos).toEqual(mockTodos));
    expect(result.current.completedTodos).toEqual([mockTodos[1]]);
    expect(result.current.uncompletedTodos).toEqual([mockTodos[0]]);
  });

  it('should add a new todo', async () => {
    const mockTodo = { id: '3', title: 'Test Todo 3', completed: false };
    const initialTodos = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true },
    ];

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(initialTodos));

    const { result } = renderHook(() => useTodoProviderLogic());

    // Wait for todos to load before acting
    await waitFor(() => expect(result.current.todos).toEqual(initialTodos));

    // Adding a new todo
    act(() => {
      result.current.addTodo(mockTodo);
    });

    // Wait for the state update to reflect the new todo
    await waitFor(() => expect(result.current.todos).toContainEqual(mockTodo));

    // Verify that SecureStore is called with updated todos
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'todos',
      JSON.stringify([...initialTodos, mockTodo])
    );
  });
});
