import InputTodo from 'components/InputTodo';
import TodosList from 'components/TodoList';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodosLogic = () => {
  const initialTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(initialTodos());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => todo.id !== id),
    ]);
  };

  const setUpdate = (updatedTitle, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: updatedTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <InputTodo addTodoItem={addTodoItem} />
      <TodosList
        todosProps={todos}
        handleChange={handleChange}
        delTodo={delTodo}
        setUpdate={setUpdate}
      />
    </div>
  );
};
export default TodosLogic;
