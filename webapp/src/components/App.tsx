import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useGoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { googleClientId } from '../constants'
import { mergeLocalAndServerTodos } from "../store/thunks/todos"
import { login } from '../store/thunks/user'
import { TodoForm } from "./TodoForm"
import { TodoItem } from "./TodoItem"
import { Loader } from "./Loader"
import "../styles/App.css"
import "../styles/Colors.css"

export function App() {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)
  const darkTheme = useSelector(state => state.darkTheme)
  const userId = useSelector(state => state.user.tokenId)
  const className = darkTheme ? "dark-theme" : ""
  const { loaded } = useGoogleLogin({
    clientId: googleClientId,
    onSuccess: (response) => dispatch(login(response)),
    isSignedIn: true,
  })

  // Merge todos on login
  useEffect(() => {
    if (userId)
      dispatch(mergeLocalAndServerTodos())
  }, [ userId, dispatch ])

  return <>
    <main className={className}>
      {!loaded
        ? <Loader />
        : [ 
          <TodoForm key={"TodoForm"}/>,
          todos.map(todo => <TodoItem key={todo.uuid} {...todo}/>)
        ]}
    </main>
  </>
}
