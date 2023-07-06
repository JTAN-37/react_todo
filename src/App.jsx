import "./styles.css"
import { useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])
  //Return value of setTodos is the new state

  function handleSubmit(e) {
    e.preventDefault() //Prevents a refresh

    //To modify state, must pass function.
    //Function returns new state
    //Single argument is current state

    //... is spread operater in JS, it takes out array's elements and puts them
    //A UUID is a unique ID number. That's it.
    setTodos( (currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    //Clears the search bar
    setNewItem("")
  }

  //Change the todo with the id based on completed flag
  //ANY TIME state is changed, must create new state object
  function toggleTodo(id, completed) {

    //we pass a function to setTodos (=> denotes a function)
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      //Returns an array without the todo's id that equals the passed id
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
  <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input 
          value={newItem}
          //when there is a change, call function to change value
          //and rerun component
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
      {//Short circuit logic to show "No Todos when no todo items
      }
      {todos.length === 0 && "No Todos"}
      {//Curly brackets is JavaScript code
      //Arrays in React need a key property. Why?
      //Alerts React if any changes to element in array (optimize performance)
      }
      {todos.map(todo => {
        return (
        <li key={todo.id}>
        <label>
          <input type="checkbox" checked={todo.completed}
          //onChange listens for a click event, passes todo's id and checkbox state
          onChange={e => toggleTodo(todo.id, e.target.checked)}/>

          {todo.title}
        </label>
        <button 
          //onClick calls a function, which calls deleteTodo
          onClick={() => deleteTodo(todo.id)}
          className="btn btn-danger">
            Delete
        </button>
      </li>
        )
      })}
    </ul>
  </>
  )
}