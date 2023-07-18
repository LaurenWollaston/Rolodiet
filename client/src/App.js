import logo from './logo.svg';
import Navbar from "./components/Navbar.js";
import './App.css';
import MainPage from './components/MainPage';
import desktopBackground from './images/169.webp'
import mobileBackground from './images/mobile.webp'

function App() {
  const imageUrl = window.innerWidth >= 650 ? desktopBackground : mobileBackground;
  return (
    <div className="App" style={{backgroundImage: `url(${imageUrl})` }}>
      <MainPage /> =
    </div>
  );
}

export default App;