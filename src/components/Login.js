import React from 'react';
import { useState } from 'react';
import {Routes, Route, Link,} from "react-router-dom"
import axios from 'axios';

import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';
import Project from './Project';

const Spacer = ({ height, width }) => {
    return <div style={{ height, width }}></div>;
};

const Login = () => {
    const [userData, setUserData] = useState({
        user: "",
        pass: ""
    });
    const [passDisplay, setPassDisplay] = useState("");

    function requestUser() {
        //delete when done testing linking
        window.location.href = '/AccessProjectPage'

        axios({
            method: "POST",
            url: `/user/`,
            data: {
                username: userData.user,
                password: userData.pass
            }
        }).then((response) => {
            console.log(response.data)
            if(response.data["result"] == "success"){
                window.location.href = '/AccessProjectPage'
            }
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
            if(response.data["result"] == "user successfully added"){
                window.location.href = '/AccessProjectPage'
            }
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

    function handleChangePass(event) { 
        const {value, name} = event.target

        let completePass = ""
        if(value.length > userData.pass.length){
            completePass = userData.pass + value.charAt(value.length-1)
        }
        else{
            completePass = userData.pass.substring(0,userData.pass.length-1)
        }

        let dots = ""
        for (let i = 0; dots.length < completePass.length-1; i++){
            dots = dots + "*"
        }
        dots = dots + completePass.substring(value.length-1)

        setPassDisplay(dots)
        setUserData(prevNote => ({
            ...prevNote, [name]: completePass})
        )
    }

    return(
        <div>
            {/*Login*/}
            <BackgroundBox>
            
                <Shape width = "400px" height = "50px" text = "User Login"></Shape>
                
                Username: <input onChange={(event) => {handleChange(event)}} 
                    type="user"
                    text={userData.user} 
                    name="user" 
                    placeholder="Username" 
                    value={userData.user} />
                <Spacer height="20px" />
                Password: <input onChange={(event) => {handleChangePass(event)}} 
                    type="pass"
                    text={userData.pass} 
                    name="pass" 
                    placeholder="Password" 
                    value={passDisplay} />
                <Spacer height="20px" />
                <button onClick={() => {requestUser()}}>Sign In</button>
                
            </BackgroundBox>
            
            {/*Sign Up*/}
            <BackgroundBox>
                <Shape width = "400px" height = "50px" text = "New Sign Up"></Shape>
            
                Username: <input onChange={(event) => {handleChange(event)}} 
                    type="new_user"
                    text={userData.new_user} 
                    name="new_user" 
                    placeholder="Username" 
                    value={userData.new_user} />
            
                <Spacer height="20px" />
        
                Password: <input onChange={(event) => {handleChange(event)}} 
                    type="new_pass"
                    text={userData.new_pass} 
                    name="new_pass" 
                    placeholder="Password" 
                    value={userData.new_pass} />
            
                <Spacer height="20px" />
                <button onClick={() => {pushUser()}}>Create Account</button>
            </BackgroundBox>
        </div>
    )

}

export default Login;