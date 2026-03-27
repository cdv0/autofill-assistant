import './App.css'
import Button from './components/atoms/Button'
import { User, Search } from "lucide-react";
import Logo from './components/atoms/LogoWithText';
import Input from './components/atoms/TextInput';
import NavItem from './components/atoms/NavItem';
import LabelInput from './components/molecules/LabelInput';

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

      <Input placeholder='Search' type='search' icon={Search}/>
      <Input placeholder='Type here' type="text" />

      <NavItem onClick={() => {}} text='Testing' isDropdown={false} icon={User} style='danger'/>

      <LabelInput labelText='Testing' placeholder='Placeholder' addTrashIcon={true}/>
    </>
  )
}

export default App
