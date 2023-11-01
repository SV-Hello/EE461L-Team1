import logo from './logo.svg';
import './App.css';

import Login from './components/Login.js'
import AccessProjectPage from './components/AccessProjectPage';
import Project from './components/Project';

function login() {
  alert('Login Attempted!')
}

const Spacer = ({ height, width }) => {
  return <div style={{ height, width }}></div>;
};

function App() {
  return ( 
    <div className="App">
      <header className="App-header">

        {/*<Login></Login>*/}
        {<Login></Login>}
        {/*<Project></Project>*/}

      </header>
    </div>
  )
}

export default App;
