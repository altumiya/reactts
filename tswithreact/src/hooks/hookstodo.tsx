import { useFetch } from './useFetch';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoDisplayProps {
  todoId: number; 
}

export function TodoDisplay({ todoId }: TodoDisplayProps) {
  const { data, loading, error } = useFetch<Todo>(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );

  if (loading && !data) return <p>Loading todo #{todoId}...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '16px', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      maxWidth: '400px',
      margin: '0 auto',
    }}>
      {loading && <p role="status">Loading todo #{todoId}...</p>}
      <h2 style={{ marginTop: 0 }}>Todo #{data.id}</h2>
      <p><strong>Title:</strong> {data.title}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: data.completed ? 'green' : 'orange', fontWeight: 'bold' }}>
          {data.completed ? '✅ Completed' : '⏳ Pending'}
        </span>
      </p>
    </div>
  );
}