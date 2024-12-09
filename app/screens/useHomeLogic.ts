import { useMemo, useState } from "react";
import { Animated, Dimensions } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { TodoProps } from "../contexts/TodoContext";
import useTodoContext from "../contexts/useTodoContext";

const useHomeLogic = () => {
  const { todos, addTodo, editTodo, completedTodos, uncompletedTodos } = useTodoContext();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const options = ["All", "Completed", "Uncompleted"];
  const [modalVisible, setModalVisible] = useState(false);
  const { height } = Dimensions.get("window");
  const [slideAnim] = useState(new Animated.Value(height)); // Initial position off-screen

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide up to show modal
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height, // Slide down to hide modal
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const add = () => {
    console.log("new title: ", title);
    if (title) {
      const todo: TodoProps = {
        title,
        completed: false,
        id: uuidv4(),
      };
      addTodo(todo);
      setTitle(undefined);
    }
  };

  const markAsCompleted = (todo: TodoProps) => {
    const { title, completed, id } = todo;
    const updatedTodo: TodoProps = {
      title,
      completed: !completed,
      id,
    };
    editTodo(updatedTodo);
    setSelectedOption("All");
    openModal();
  };

  return useMemo(
    () => ({
      todos,
      completedTodos,
      uncompletedTodos,
      selectedOption,
      modalVisible,
      options,
      markAsCompleted,
      add,
      closeModal,
      setSelectedOption,
      title,
      setTitle,
      slideAnim,
    }),
    [
      todos,
      completedTodos,
      uncompletedTodos,
      selectedOption,
      modalVisible,
      options,
      markAsCompleted,
      add,
      closeModal,
      setSelectedOption,
      title,
      setTitle,
      slideAnim,
    ]
  );
};

export default useHomeLogic;
