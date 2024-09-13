

import React, { useState } from 'react';
import { useTodos, useCreateTodo, useDeleteTodo, useUpdateTodo } from './Utils/todosApi.jsx'

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [deleteId, setDeleteId] = useState('')

  const { data, error, isLoading, isError } = useTodos();
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();

  // Post request  onsubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo) return;  
    const newPost = { newTodo };
    createTodoMutation.mutate(newPost);  
    setNewTodo('');  
  };

  // Edit function on click
  const handleEdit = (id, text) => {
    setEditTodo(id);      
    setEditText(text);    
  };

  // Handle submission of the edited todo
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editText) return;
    updateTodoMutation.mutate({ id: editTodo, text: editText });  
    setEditTodo(null);  
    setEditText('');    
  };

  // On Delete function
  const handleDelete = (id) => {
    deleteTodoMutation.mutate(id); 
    setDeleteId(id)
  };

 
  if (isLoading) return <div>Loading todos...</div>;
  if (isError) return <div>Error fetching todos: {error.message}</div>;

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="border-[2px]"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter your todo..."
        />
        <button type="submit" className='bg-black p-1 text-white'>
          {createTodoMutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>

    {/* eiditing todo */}
      {editTodo && (  
        <form onSubmit={handleEditSubmit} className="flex mt-5">
          <input
            type="text"
            className="border-[2px]"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit your todo..."
          />
          <button type="submit" className='bg-blue-500 p-1 text-white'>
            {updateTodoMutation.isPending ? "Updating..." : "Update"}
          </button>
        </form>
      )}

{/* display data get request */}
      <div>
        {data?.msg?.map((todo, index) => (
          <div className="flex items-center mt-5" key={index}>
            <div>{todo.text}</div>
            <button
              className="mx-2 bg-black text-white cursor-pointer p-1"
              onClick={() => handleEdit(todo._id, todo.text)} // Set the todo to edit
            >
              Edit
            </button>
            <button
              className="bg-black text-white cursor-pointer p-1"
              onClick={() => handleDelete(todo._id)}
            >
              {deleteId === todo._id ? 'Deleting...' : 'Delete' }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
