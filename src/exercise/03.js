// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const value = [on, toggle]
  return (
    <ToggleContext.Provider value={value}>
      {
        React.Children.map(children, child => {
          return typeof child.type === 'string'
            ? child
            : React.cloneElement(child, {on, toggle})
        })
      }
    </ToggleContext.Provider>
  )
}

function useFetchContext(ToggleContext){
  const context = React.useContext(ToggleContext)
  if(!context){
    throw new Error(`Element should be within scope of ${ToggleContext}`)
  }
  return context
}

function ToggleOn({children}) {
  const [on, _] = useFetchContext(ToggleContext)
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const [on, _] = useFetchContext(ToggleContext)
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {
  const [on, toggle] = useFetchContext(ToggleContext)
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
