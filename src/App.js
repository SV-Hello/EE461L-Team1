import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import './App.css';
import AccessProjectPage from './Components/AccessProjectPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
          <div>
          <switch>
            <Routes>
                <Route exact path="/" element={<LoginPage></LoginPage>} />
                <Route path="/AccessProjectPage" element={<AccessProjectPage></AccessProjectPage>} />
            </Routes>
            </switch>
            {/*<LoginPage></LoginPage>*/}
            {/*<AccessProjectPage></AccessProjectPage>*/}
          </div>
        </Router>
  
      </header>
    </div>
  );
}

export default App;
