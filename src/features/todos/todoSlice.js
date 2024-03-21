import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todo: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id == action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
    },
    toggle: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id == action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    getLocalTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggle, getLocalTodos } =
  todoSlice.actions;

export default todoSlice.reducer;