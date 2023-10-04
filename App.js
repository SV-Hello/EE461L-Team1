import logo from './logo.svg';
import './App.css';
import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';

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

        {/*Login*/}
        <BackgroundBox>
        
        <Shape width = "400px" height = "50px" text = "User Login"></Shape>
        <label>
          Username: <input name="myInput" />
        </label>
        <Spacer height="20px" />
        <button onClick={login}>Sign In</button>
        
        </BackgroundBox>
        
        {/*Sign Up*/}
        <BackgroundBox>

        <Shape width = "400px" height = "50px" text = "New Sign Up"></Shape>
        <label>
          Username: <input name="input" />
        </label>
        <Spacer height="20px" />
        <label>
          Password: <input name="password" />
        </label>
        <Spacer height="20px" />
        <button onClick={login}>Create Account</button>
        
        </BackgroundBox>
        
      </header>
    </div>
  )
}

export default App;
