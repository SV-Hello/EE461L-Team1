import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import './App.css';
import AccessProjectPage from './components/AccessProjectPage';
import Login from './components/Login';
import HardwareSet from './components/HardwareSet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
          <div>
          <switch>
            <Routes>
                <Route exact path="/" element={<Login></Login>} />
                <Route path="/AccessProjectPage" element={<AccessProjectPage></AccessProjectPage>} />
                <Route path="/project" element={<HardwareSet></HardwareSet>} />
            </Routes>
          </switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
