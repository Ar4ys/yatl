export const copy = target => {
  return JSON.parse(JSON.stringify(target))
}

export const createSlice = ({ name, initialState, reducers }) => {
  const actions = {}
  const newReducers = {}

  for (const type of Object.keys(reducers)) {
    const action = createAction(name + "/" + type)
    actions[type] = action
    newReducers[action] = reducers[type]
  }

  const reducer = createReducer(initialState, newReducers)

  return {
    actions,
    reducer
  }
}

export const createAction = type => {
  const action = payload => ({ type, payload })
  action.type = type
  action.toString = () => type
  return action
}

export const createReducer = (init, reducers) => (state = init, action) => {
  const newState = copy(state)
  for (const [ type, reducer ] of Object.entries(reducers))
    if (action.type === type)
      return reducer(newState, action.payload)

  return state
}

export const allColors = [
  "default", "red", "orange",
  "yellow", "green", "blue-green",
  "blue", "dark-blue", "purple",
  "pink", "brown", "grey"

]
