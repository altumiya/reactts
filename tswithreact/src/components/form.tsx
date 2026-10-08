import React from "react";
import { useState } from "react";

interface formprops{
    onSumbit(order: {name: string, seats: number}) : void
}

export default function Form({onSumbit}:formprops) {
    const[name,setName] = useState<string>("lower") // <> just for extra type safety
    const[seats ,setSeats] = useState<number>(1)

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        onSumbit({name , seats})
    }

   return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input 
      value = {name}
      onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value)  
      }/>

       <label>Seats</label>
      <input 
      type ="number"
      value = {seats}
      onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
      setSeats(Number(e.target.value) ) 
      }/>
      <button type="submit">select seat</button>
    </form>
  )
}
