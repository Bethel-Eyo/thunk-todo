import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AnimatedModal from "../components/AnimatedModal/AnimatedModal";
import TodoItem from "../components/TodoItem/TodoItem";
import useHomeLogic from "./useHomeLogic";


const Home = () => {
  const {
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
  } = useHomeLogic();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.todosContainer}>
          <Text style={styles.title}>Thunk's todos</Text>
          <View style={styles.radioContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioItem}
                onPress={() => setSelectedOption(option)}
              >
                <View style={[styles.radioCircle, selectedOption === option && styles.selected]} />
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedOption === "All" && (
            <View style={styles.todoItems}>
              {todos.map((todo) => (
                <TouchableOpacity key={todo.id} onPress={() => markAsCompleted(todo)}>
                  <TodoItem title={todo.title} id={todo.id} completed={todo.completed} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedOption === "Completed" && (
            <View style={styles.todoItems}>
              {completedTodos.map((todo) => (
                <TouchableOpacity key={todo.id} onPress={() => markAsCompleted(todo)}>
                  <TodoItem title={todo.title} id={todo.id} completed={todo.completed} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedOption === "Uncompleted" && (
            <View style={styles.todoItems}>
              {uncompletedTodos.map((todo) => (
                <TouchableOpacity key={todo.id} onPress={() => markAsCompleted(todo)}>
                  <TodoItem title={todo.title} id={todo.id} completed={todo.completed} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.todoInputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TouchableOpacity onPress={add}>
          <View style={styles.addButton}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <AnimatedModal closeModal={closeModal} modalVisible={modalVisible} slideAnim={slideAnim} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  todosContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  todoItems: {
    marginTop: 30,
  },
  todoInputContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#4CAF50",
  },
  radioLabel: {
    marginLeft: 5,
    fontSize: 16,
  },
  radioItem: {
    flexDirection: "row",
    marginRight: 10,
  },
});
