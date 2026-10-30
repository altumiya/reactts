import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { configureStore, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

// 1. Define Todo interface
export interface Todo {
  id: string;
  text: string;
}

// 2. Define initial state type
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [{ id: "1", text: "Hello world" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

// 3. Define RootState and AppDispatch types for strong typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use typed hooks across your application
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function AddTodo(): React.JSX.Element {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const addTodoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addTodo(input.trim()));
    setInput("");
  };

  return (
    <form
      onSubmit={addTodoHandler}
      style={{ display: "flex", gap: "10px", marginBottom: "24px" }}
    >
      <input
        type="text"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        style={{
          flex: 1,
          backgroundColor: "#1f2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          color: "#f3f4f6",
          padding: "10px 14px",
          fontSize: "15px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#6366f1",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Add Todo
      </button>
    </form>
  );
}

export function Todos(): React.JSX.Element {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveClick = (id: string) => {
    if (!editText.trim()) return;
    dispatch(updateTodo({ id, text: editText.trim() }));
    setEditingId(null);
    setEditText("");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div>
      <h3 style={{ color: "#9ca3af", fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
        Todos List
      </h3>

      {todos.length === 0 ? (
        <p style={{ color: "#6b7280", textAlign: "center", margin: "20px 0" }}>
          No todos found. Add one above!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.map((todo) => {
            const isEditing = editingId === todo.id;

            return (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#27272a",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  gap: "10px",
                }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                    autoFocus
                    style={{
                      flex: 1,
                      backgroundColor: "#3f3f46",
                      border: "1px solid #6366f1",
                      borderRadius: "6px",
                      color: "#ffffff",
                      padding: "6px 10px",
                      outline: "none",
                      fontSize: "14px",
                    }}
                  />
                ) : (
                  <span style={{ color: "#ffffff", fontSize: "15px", wordBreak: "break-word" }}>
                    {todo.text}
                  </span>
                )}

                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveClick(todo.id)}
                        style={{
                          backgroundColor: "#16a34a",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        style={{
                          backgroundColor: "#4b5563",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditClick(todo)}
                        style={{
                          backgroundColor: "#eab308",
                          color: "#000",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 10px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(removeTodo(todo.id))}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 10px",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Ex7(): React.JSX.Element {
  return (
    <Provider store={store}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#09090b",
          color: "#f4f4f5",
          display: "flex",
          justifyContent: "center",
          padding: "40px 16px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: "550px" }}>
          <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "700", marginBottom: "28px" }}>
            Redux Toolkit Todo
          </h1>
          <AddTodo />
          <Todos />
        </div>
      </div>
    </Provider>
  );
}