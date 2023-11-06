import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import './App.css';
import AccessProjectPage from './components/AccessProjectPage';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
          <div>
          <switch>
            <Routes>
                <Route exact path="/" element={<Login></Login>} />
                <Route exact path="/AccessProjectPage" element={<AccessProjectPage></AccessProjectPage>} />
            </Routes>
            </switch>
            {/*<Login></Login>*/}
            {/*<AccessProjectPage></AccessProjectPage>*/}
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
