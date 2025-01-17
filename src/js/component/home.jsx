import React,{ useEffect, useState } from 'react'

function App() {
  
  const [state, setState] = useState([])
  const [input, setInput] = useState("")
  
  useEffect(() => {
    getTodoList();
  }, [])
  
  const getTodoList = async () => {
    const response = await fetch('https://playground.4geeks.com/todo/users/DavidGmzc', {
      method: 'GET'
    });
    if (!response.ok){
      console.error("Error al iniciar el to do list");
      createUser();
    }
    console.log(response)
    const {todos} = await response.json();
    setState(todos);
  }
 
  const createUser = async () => {
    const response = await fetch('https://playground.4geeks.com/todo/users/DavidGmzc', {
      method: 'POST'
    })
    const data = await response.json()
    console.log("usuario creado: ", data);
  }

  const addTodoItem = async () => {
    await fetch('https://playground.4geeks.com/todo/todos/DavidGmzc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ label: input, is_done: false })
    })
    await getTodoList();
    setInput('');
  }
  
  const deleteTodoItem = async (todoId) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: 'DELETE'
    })
    await getTodoList();
  }

  return (
    <>
      <h1>To Do List</h1>
      <br/>
        <input value={input}  onChange={(e) => {
          setInput(e.target.value)
        }}></input>
        <br/>
        <button onClick={addTodoItem}>Agregar</button>
        <br/>
        <br/>
      <ul>
        {state.map((item, index) => {
          return (<>
            <li>
              {item.label} <button className='btn' onClick={() => deleteTodoItem(item.id)}>x</button>
            </li>
          </>)
        })}
      </ul>
      <p>{state.length} Items to do</p>
    </>
  )
}
export default App;