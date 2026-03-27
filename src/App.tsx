import "./App.css";
import bg from "./assets/background.avif";
import Shell from "./components/organisms/MainContentShell";

function App() {
  return (
    <>
      {/* Root with background */}
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Background Transparency */}
        <div className="absolute inset-0 bg-white/70" />
        
        {/* Content */}
        <div className="flex flex-col gap-6 relative z-10">
          <Shell />
        </div>
      </div>
    </>
  );
}

export default App;
