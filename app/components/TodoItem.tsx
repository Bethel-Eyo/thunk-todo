import React, { FC, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { TodoProps } from "../contexts/TodoContext";
import { MaterialIcons } from "@expo/vector-icons";
import useTodoContext from "../contexts/useTodoContext";

const TodoItem: FC<TodoProps> = ({ id, title, completed }) => {
  const { deleteTodo, editTodo } = useTodoContext();
  const [editable, setEditable] = useState<boolean>(false);
  const [text, setText] = useState(title);
  const textInputRef = useRef<TextInput>(null);

  const onEdit = () => {
    setEditable(true);
    if (textInputRef.current) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 0); // Ensure focus happens after state update
    }
  };

  const onSave = () => {
    const updatedTodo: TodoProps = {
      title: text,
      completed,
      id,
    };
    editTodo(updatedTodo);
    setEditable(false);
  }

  return (
    <View>
      {editable && (
        <Text style={styles.tipText}>click save icon to save changes after editing</Text>
      )}
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}>
            {completed && <MaterialIcons name="done" size={20} color="green" />}
          </View>
          <TextInput
            ref={textInputRef}
            multiline={true}
            editable={editable}
            style={styles.todoText}
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View>
          {editable ? (
            <TouchableOpacity onPress={onSave}>
              <MaterialIcons name="save" size={20} color="blue" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onEdit}>
              <MaterialIcons name="edit" size={20} color="grey" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteTodo(id)}>
            <MaterialIcons name="delete" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
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
  deleteIcon: {
    marginTop: 10,
  },
  tipText: {
    marginBottom: 5,
    marginLeft: 5,
    color: "grey",
  },
});

export default TodoItem;
