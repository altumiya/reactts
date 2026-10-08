import './App.css'
import { Card } from './components/card.tsx';

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
    </>
  )
}

export default App
