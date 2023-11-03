import React from 'react';
import { useState } from 'react';
import {Routes, Route, Link,} from "react-router-dom"
import axios from 'axios';

import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';
import Project from './Project';

// function log() {
//     <nav>
//     <ul>
//     <li><Link to="/">AccessProjectPage</Link></li>
//     </ul>
//     </nav>
// }

const Spacer = ({ height, width }) => {
    return <div style={{ height, width }}></div>;
};

const Login = () => {
    const [userData, setUserData] = useState({
        user: "",
        pass: ""
    });

    function requestUser() {
        axios({
            method: "POST",
            url: `/user/`,
            data: {
                username: userData.user,
                password: userData.pass
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
        })
    }

    function pushUser() {
        axios({
            method: "POST",
            url: "/adduser",
            data: {
                username: userData.new_user,
                password: userData.new_pass
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }
          })
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setUserData(prevNote => ({
            ...prevNote, [name]: value})
        )
    }

    return(
        <div>
            {/*Login*/}
            <BackgroundBox>
            
                <Shape width = "400px" height = "50px" text = "User Login"></Shape>
                
                Username: <input onChange={handleChange} 
                    type="user"
                    text={userData.user} 
                    name="user" 
                    placeholder="Username" 
                    value={userData.user} />
                <Spacer height="20px" />
                Password: <input onChange={handleChange} 
                    type="pass"
                    text={userData.pass} 
                    name="pass" 
                    placeholder="Password" 
                    value={userData.pass} />
                <Spacer height="20px" />
                <button onClick={requestUser}>Sign In</button>
                
            </BackgroundBox>
            
            {/*Sign Up*/}
            <BackgroundBox>
                <Shape width = "400px" height = "50px" text = "New Sign Up"></Shape>
               
                Username: <input onChange={handleChange} 
                    type="new_user"
                    text={userData.new_user} 
                    name="new_user" 
                    placeholder="Username" 
                    value={userData.new_user} />
               
                <Spacer height="20px" />
           
                Password: <input onChange={handleChange} 
                    type="new_pass"
                    text={userData.new_pass} 
                    name="new_pass" 
                    placeholder="Password" 
                    value={userData.new_pass} />
               
                <Spacer height="20px" />
                <button onClick={pushUser}>Create Account</button>
            </BackgroundBox>
    
        </div>
    )

}

export default Login;