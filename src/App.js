import logo from './logo.svg';
import Home from './pages/Home/Home';
import HeaderMenu from './pages/Home/HeaderMenu';
import { Outlet } from "react-router-dom";
import './App.css'
function App() {
  return (
    <div className="App">
      <div className="Header-container">
      <HeaderMenu /> {/* Hiển thị HeaderMenu ở mọi trang */}
      </div>
      <div className="Main-content">
      <Outlet /> {/* Hiển thị nội dung của route con */}
      </div>
    </div>
  );
}


export default App;   
