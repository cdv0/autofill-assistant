import "./App.css";
import bg from "./assets/background.avif";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dash from "./components/pages/Dash";
import Auth from "./components/templates/Auth";

function App() {
  return (
    <BrowserRouter>

    {/* Background image */}
      <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
        
        {/* Background Transparency */}
        <div className="absolute inset-0 bg-white/70" />

        {/* Content */}
        <div className="flex flex-col h-screen gap-6 relative z-10">
          <Routes>
            
            {/* AUTH PAGE */}
            <Route path="/" element={<Auth />} />

            {/* DASHBOARD PAGE */}
            <Route path="/dash" element={
                <Dash
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
              }
            />

            {/* fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;