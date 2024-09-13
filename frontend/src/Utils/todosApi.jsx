import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Custom Hook for fetching todos
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get("http://localhost:8000/api/todos").then((res) => res.data),
  });
};

// Custom Hook for creating a todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTodo) => axios.post('http://localhost:8000/api/todos', newTodo),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
    onError: (error) => console.error('Error creating post:', error),
  });
};

// Custom Hook for deleting a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:8000/api/todos/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
    onError: (error) => console.error('Error deleting todo:', error),
  });
};

// Custom Hook for updating a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, text }) => axios.put(`http://localhost:8000/api/todos/${id}`, { text }),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
    onError: (error) => console.error('Error updating todo:', error),
  });
};
