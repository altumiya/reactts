import React from 'react';
import { useFetch } from './useFetch';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function TodoDisplay() {
  const { data, loading, error } = useFetch<Todo>(
    'https://jsonplaceholder.typicode.com/todos/1'
  );

  if (loading) return <p>Loading todo...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>Todo #{data.id}</h2>
      <p><strong>Title:</strong> {data.title}</p>
      <p><strong>Status:</strong> {data.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
}