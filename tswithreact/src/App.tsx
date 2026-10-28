import './App.css'
import { Card } from './components/card.tsx';
import { Counter } from './components/counter.tsx';
import type { seat } from './types.ts'
import { List } from './components/list.tsx';
import Form from './components/form.tsx';
import Cards2 from './components/cards2.tsx';
import { TaskManager } from './components/taskmng.tsx';
import Ex1 from './assets/prax/ex1.tsx';
import Ex2 from './assets/prax/ex2.tsx';
import Ex3 from './assets/prax/ex3.tsx';

const menu:seat[] = [
  {id: 1, name: "lower", price: 1000},
  {id: 2, name: "middle", price: 700},
  {id: 3, name: "upper", price: 500},
]
export default function App() {
  
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
      <div>
        <TaskManager/>
      
    </div>
    <div>
      <Ex1/>
    </div>
    <div>
      <Ex2/>
    </div>
    <div>
      <Ex3/>
    </div>
    </>
  )
}

