import React, { createContext, useContext, useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";

// 1. Define interfaces for Todo and Context types
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  updateTodo: (id: number, updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

// 2. Create Context with default values matching the interface
export const TodoContext = createContext<TodoContextType>({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});

export const useTodo = (): TodoContextType => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;

export function TodoForm(): React.JSX.Element {
  const [todo, setTodo] = useState<string>("");
  const { addTodo } = useTodo();

  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todo: todo.trim(), completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} style={{ display: "flex", width: "100%", gap: "8px" }}>
      <input
        type="text"
        placeholder="Write Todo..."
        value={todo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
        style={{
          flex: 1,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          padding: "10px 14px",
          outline: "none",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          color: "#ffffff",
          fontSize: "15px",
        }}
      />
      <button
        type="submit"
        style={{
          borderRadius: "8px",
          padding: "10px 20px",
          backgroundColor: "#16a34a",
          color: "#ffffff",
          border: "none",
          fontWeight: "600",
          cursor: "pointer",
          flexShrink: 0,
          transition: "background-color 0.2s",
        }}
      >
        Add
      </button>
    </form>
  );
}

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): React.JSX.Element {
  const [isTodoEditable, setIsTodoEditable] = useState<boolean>(false);
  const [todoMsg, setTodoMsg] = useState<string>(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "8px 12px",
        gap: "10px",
        backgroundColor: todo.completed ? "#c6e9a7" : "#ccbed7",
        color: "#000000",
        transition: "all 0.25s ease",
        marginBottom: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        style={{ width: "18px", height: "18px", cursor: "pointer" }}
      />
      <input
        type="text"
        value={todoMsg}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        style={{
          border: isTodoEditable ? "1px solid rgba(0, 0, 0, 0.25)" : "1px solid transparent",
          backgroundColor: isTodoEditable ? "rgba(255, 255, 255, 0.5)" : "transparent",
          outline: "none",
          width: "100%",
          borderRadius: "6px",
          padding: "4px 8px",
          fontSize: "15px",
          color: "#1e293b",
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.7 : 1,
        }}
      />
      {/* Edit / Save Button */}
      <button
        type="button"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "6px",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          cursor: todo.completed ? "not-allowed" : "pointer",
          opacity: todo.completed ? 0.4 : 1,
          flexShrink: 0,
        }}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => deleteTodo(todo.id)}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "6px",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        ❌
      </button>
    </div>
  );
}

export default function Ex6(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const hasLoaded = useRef<boolean>(false);

  const addTodo = (todo: Omit<Todo, "id">) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id: number, updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  // Safe LocalStorage Fetch
  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      if (Array.isArray(storedTodos) && storedTodos.length > 0) {
        setTodos(storedTodos);
      }
    } catch (err) {
      console.error("Failed to parse todos from localStorage:", err);
    } finally {
      hasLoaded.current = true;
    }
  }, []);

  // Safe LocalStorage Save (prevents overwriting storage on initial load)
  useEffect(() => {
    if (hasLoaded.current) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div
        style={{
          backgroundColor: "#172842",
          minHeight: "100vh",
          padding: "32px 16px",
          boxSizing: "border-box",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            height: "fit-content",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "24px",
              color: "#ffffff",
            }}
          >
            Manage Your Todos
          </h1>

          <div style={{ marginBottom: "20px" }}>
            <TodoForm />
          </div>

          <div>
            {todos.length === 0 ? (
              <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "14px", margin: "20px 0" }}>
                No todos yet. Add one above!
              </p>
            ) : (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}