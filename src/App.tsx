import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Button from './components/atoms/Button'

function App() {

  return (
    <>
      <Button name="Normal Button" onClick={() => {}} color="primaryFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="dangerFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="dangerNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="darkGrayNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="primaryNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="secondaryNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="successNoFill"></Button>
    </>
  )
}

export default App
