import TodoProvider from "./contexts/TodoProvider";
import Home from "./screens/Home";

export default function Index() {
  return (
    <TodoProvider>
      <Home />
    </TodoProvider>
  );
}
