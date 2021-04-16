import { useSelector } from "react-redux"
import { TodoForm } from "./TodoForm"
import { TodoItem } from "./TodoItem"
import "../styles/App.css"
import "../styles/Colors.css"

export function App() {
  const { todos, darkTheme } = useSelector(state => state)
  const className = darkTheme ? "dark-theme" : ""
  return <>
    <main className={className}>
      <TodoForm />
      {todos.map(todo => <TodoItem key={todo.id} {...todo}/>)}
    </main>
  </>
}
