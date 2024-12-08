import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import TaskItem from "../components/TaskItem";
import { useTodoContext } from "../contexts/useTodoContext";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { TodoProps } from "../contexts/TodoContext";

const Home = () => {
  const { todos, addTodo } = useTodoContext();
  const [title, setTitle] = useState<string | undefined>(undefined);

  const add = () => {
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
          <View style={styles.todoItems}>
            {todos.map((todo, index) => (
              <TouchableOpacity key={index}>
                <TaskItem title={todo.title} id={todo.id} completed={todo.completed} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
      </ScrollView>
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
});
