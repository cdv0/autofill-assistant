import "./App.css";
import bg from "./assets/background.avif";
import DashLayout from "./components/templates/DashLayout";

function App() {
  return (
    <>
      {/* Root with background */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Background Transparency */}
        <div className="absolute inset-0 bg-white/70" />
        
        {/* Content */}
        <div className="flex flex-col h-screen gap-6 relative z-10">
          <DashLayout
            controlMode="viewing"
            shellMode="groups"
            onCreate={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onSave={() => {}}
            onCancel={() => {}}
            onClickAccount={() => {}}
            onClickLogOut={() => {}}
            onClickRow={() => {}}
            onClickBack={() => {}}
          />
        </div>
      </div>
    </>
  );
}

export default App;
