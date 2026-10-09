import './App.css'
import { Card } from './components/card.tsx';
import { Counter } from './components/counter.tsx';
import type { seat } from './types.ts'
import { List } from './components/list.tsx';
import Form from './components/form.tsx';
import Cards2 from './components/cards2.tsx';
import { TodoDisplay } from './hooks/hookstodo.tsx';
import { useState } from 'react';

const menu:seat[] = [
  {id: 1, name: "lower", price: 1000},
  {id: 2, name: "middle", price: 700},
  {id: 3, name: "upper", price: 500},
]
export default function App() {
  const [currentTodoId, setCurrentTodoId] = useState<number>(1);

  return (
    <>
      <div>
        <Card
        name="Iphone 14"
        price="1000"
        isAvailable={true}
        />
        <Card
        name="Samsung Galaxy S23"
        price={900}
        isAvailable={false}
        />
      </div>
      <div>
        <Counter/>
      </div>
      <div>
        <List seats= {menu}/>
      </div>
      <div>
        <Form
        onSumbit={(order)=>{
          console.log("placed", order.name, order.seats )
        }
      }/>
      </div>
      <div>
        <Cards2
        title="Iphone 14"
        footer= {<button>Buy Now</button>}  //react node
        />
      </div>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
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
    </>
  )
}


