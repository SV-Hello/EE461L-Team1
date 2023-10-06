import React from 'react';
import {Routes, Route, Link,} from "react-router-dom"

import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';
import AccessProjectPage from './AccessProjectPage';
import Project from './Project';

function log() {
    <nav>
    <ul>
    <li><Link to="/">AccessProjectPage</Link></li>
    </ul>
    </nav>
  }
  
  const Spacer = ({ height, width }) => {
    return <div style={{ height, width }}></div>;
  };

const Login = () => {
    return(
        <div>

            {/*Login*/}
            <BackgroundBox>
            
                <Shape width = "400px" height = "50px" text = "User Login"></Shape>
                
                Username: <input username="myUsername" />
               
                <Spacer height="20px" />
                <button onClick={log}>Sign In</button>
                
            </BackgroundBox>
            
            {/*Sign Up*/}
            <BackgroundBox>

                <Shape width = "400px" height = "50px" text = "New Sign Up"></Shape>
               
                Username: <input username="myUsername" />
               
                <Spacer height="20px" />
           
                Password: <input password="myPassword" />
               
                <Spacer height="20px" />
                <button onClick={log}>Create Account</button>
                
            </BackgroundBox>
    
        </div>
    )

}

export default Login;
