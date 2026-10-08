import './App.css'
import { Card } from './components/card.tsx';
import { Counter } from './components/counter.tsx';
import type { seat } from './types.ts'
import { List } from './components/list.tsx';

const menu:seat[] = [
  {id: 1, name: "lower", price: 1000},
  {id: 2, name: "middle", price: 700},
  {id: 3, name: "upper", price: 500},
]

function App() {
  

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
    </>
  )
}

export default App
