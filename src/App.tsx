import './App.css'
import Button from './components/atoms/Button'
import { User } from "lucide-react";
import Logo from './components/atoms/LogoWithText';

function App() {

  return (
    <>
      <Button name="" onClick={() => {}} color="primaryFill" icon={User} strokeWidth={3}></Button>
      <Button name="Normal Button" onClick={() => {}} color="dangerFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="dangerNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="darkGrayNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="primaryNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="secondaryNoFill"></Button>
      <Button name="Normal Button" onClick={() => {}} color="successNoFill"></Button>

      <img src='../src/assets/logo-image.svg' width={24}/>

      <Logo size="sm" onClick={() => {}} text={false}/>
      <Logo size="md" onClick={() => {}}/>
      <Logo size="lg" onClick={() => {}}/>
    </>
  )
}

export default App
