import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [ ];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};


export const useTodo = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
      const action = {
        type: "[TODO] Add Todo ",
        payload: todo,
      };

      dispatchTodo( action );
    };

    const handleDeleteTodo = (id) => {
      dispatchTodo({
        type: "[TODO] Remove Todo",
        payload: id,
      });
    };

    const handleToggleTodo = (id) => {
      dispatchTodo({
        type: "[TODO] Toggle Todo",
        payload: id,
      });
    };

    const allTodos = todos.length;
    const pendingTodosCount = (todos.filter( todo => !todo.done )).length;

    return{
         todos,
         handleDeleteTodo,
         handleNewTodo,
         handleToggleTodo,
         allTodos,
         pendingTodosCount
    }
 
}
