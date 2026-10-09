import { useState } from 'react';
import { TodoDisplay } from '../hooks/hookstodo';

export function TaskManager() {
  const [currentTodoId, setCurrentTodoId] = useState<number>(1);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' , justifyContent: 'center'}}>
        <button 
          onClick={() => setCurrentTodoId((prev) => Math.max(1, prev - 1))}
          disabled={currentTodoId === 1}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Previous
        </button>
        
        <span>Viewing Task: {currentTodoId}</span>
        
        <button 
          onClick={() => setCurrentTodoId((prev) => prev + 1)}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>

      <TodoDisplay todoId={currentTodoId} />
    </div>
  );
}