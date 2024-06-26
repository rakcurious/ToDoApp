import { useState, useEffect, useRef } from "react";
import deleteicon from "./assets/deleteicon.png";
import editicon from "./assets/editicon.png";
import saveicon from "./assets/saveicon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggle,
  getLocalTodos,
  updateTodo,
} from "./features/todos/todoSlice";

function App() {
  const [todo, setTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);
  const mainInputRef = useRef(null);
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  const handleAdd = () => {
    if (!todo || todo.trim().length === 0) return;
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingTodo && editingTodo.todo.trim().length > 0) {
      dispatch(updateTodo(editingTodo));
    }
    setIsEditing(false);
    setEditingTodo(null);
    editInputRef.current.blur();
    mainInputRef.current.focus();
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      dispatch(getLocalTodos(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const allChecked = todos.every((todo) => todo.completed);

  return (
    <div>
      <p className="text-4xl font-quicksand font-bold text-center text-purple-400 m-10">
        Task manager
      </p>

      <div className="m-10 mx-2 flex justify-center">
        <input
          type="text"
          ref={mainInputRef}
          autoFocus
          placeholder="write new task here"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleAdd() : null)}
          className="px-4 h-auto w-2/3 rounded-lg text-center py-3 text-xl font-quicksand hover:ring-2 hover:ring-pink-200 drop-shadow-sm outline-none hover:outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-500 hover:bg-purple-600 h-14 w-24 lg:w-32 rounded-xl mr-2 ml-4 text-white text-xl transition font-quicksand ease-in-out hover:-translate-y-0.5 drop-shadow-md hover:drop-shadow-lg duration-300"
        >
          add
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="my-4 mx-2 flex justify-center">
            <input
              type="checkbox"
              onChange={() => dispatch(toggle(todo.id))}
              className={`h-6 w-6 rounded-xl m-4 mx-4  cursor-pointer transition ${
                allChecked
                  ? "duration-300 ease-in-out scale-110 hover:rotate-12 -rotate-12 accent-green-700"
                  : " accent-purple-500"
              }`}
              checked={todo.completed}
            />

            {isEditing && editingTodo.id === todo.id ? (
              <input
                type="text"
                ref={editInputRef}
                autoFocus
                value={editingTodo.todo}
                onKeyUp={(e) => (e.key === "Enter" ? handleSave() : null)}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, todo: e.target.value })
                }
                className={
                  todo.completed
                    ? "bg-purple-200 px-4 h-auto py-3 w-2/3 rounded-lg text-center text-xl text-purple-500 font-quicksand break-words line-through"
                    : "bg-purple-200 px-4 h-auto py-3 w-2/3 rounded-lg text-center text-xl text-purple-500 font-quicksand break-words"
                }
              />
            ) : (
              <input
                value={todo.todo}
                readOnly={true}
                className={
                  todo.completed
                    ? "bg-purple-300/50 px-4 h-auto py-3 w-2/3 rounded-lg text-center text-xl text-purple-500 font-quicksand break-words line-through"
                    : "bg-purple-200 px-4 h-auto py-3 w-2/3 rounded-lg text-center text-xl text-purple-500 font-quicksand break-words"
                }
              />
            )}

            {isEditing && editingTodo.id === todo.id ? (
              <img
                onClick={handleSave}
                src={saveicon}
                alt="save"
                className="h-10 w-10 round mx-2 saturate-200 transition hover:-translate-y-0 translate-y-2 duration-500 ease-in-out hover:scale-105  delay-75 cursor-pointer"
              />
            ) : (
              <img
                onClick={() => !todo.completed && handleEdit(todo)}
                src={editicon}
                alt="edit"
                className={`h-10 w-10 round mx-2 saturate-200 transition hover:-translate-y-1.5 lg:hover:-translate-y-0 translate-y-2 duration-500 ease-in-out hover:scale-110 delay-75 cursor-pointer ${
                  todo.completed ? "opacity-50 cursor-default" : ""
                }`}
              />
            )}

            <img
              onClick={() => dispatch(deleteTodo(todo.id))}
              src={deleteicon}
              alt="delete"
              className="h-14 w-14 round mx-2 saturate-200 transition hover:-translate-y-1.5 lg:hover:-translate-y-2 duration-500 ease-in-out hover:scale-110 delay-75 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;