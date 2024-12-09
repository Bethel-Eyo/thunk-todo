import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TodoProps } from "../contexts/TodoContext";
import { MaterialIcons } from "@expo/vector-icons";
import useTodoContext from "../contexts/useTodoContext";

interface TaskItemProps {
  todoText: string;
}

const TaskItem: FC<TodoProps> = ({ id, title, completed }) => {
  const { deleteTodo } = useTodoContext();

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          {completed && <MaterialIcons name="done" size={20} color="green" />}
        </View>
        <Text style={styles.todoText}>{title}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    borderColor: "#55BCF6",
    borderWidth: 1,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  todoText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default TaskItem;
