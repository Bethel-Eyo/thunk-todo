import { TodoProps } from "@/app/contexts/TodoContext";
import useTodoContext from "@/app/contexts/useTodoContext";
import { useMemo, useRef, useState } from "react";
import { TextInput } from "react-native";

const useTodoItemLogic = ({ id, title, completed }: TodoProps) => {
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
  };

  return useMemo(
    () => ({ deleteTodo, editable, setText, onSave, onEdit, text, textInputRef }),
    [deleteTodo, editable, setText, onSave, onEdit, text, textInputRef]
  );
};

export default useTodoItemLogic;
