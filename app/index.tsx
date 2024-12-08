import Home from "./screens/Home";
import { TodoProvider } from "./contexts/TodoProvider";

export default function Index() {
  return (
    <TodoProvider>
      <Home />
    </TodoProvider>
  );
}
