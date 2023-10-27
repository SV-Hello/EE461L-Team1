import React from 'react';
import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';
import {Link} from "react-router-dom"
  
  const Spacer = ({ height, width }) => {
    return <div style={{ height, width }}></div>;
  };

const LoginPage = () => {
    return(
        <div>
            {/*Login*/}
            <BackgroundBox>
                
            <Shape width = "400px" height = "50px" text = "User Login"></Shape>
                
            Username: <input username="myUsername" />
            
            <Spacer height="20px" />
            
            <Link classname="Loginbtn" to="/AccessProjectPage">
                <button>Sign In</button>
            </Link>

            </BackgroundBox>
                
            {/*Sign Up*/}
            <BackgroundBox>

                <Shape width = "400px" height = "50px" text = "New Sign Up"></Shape>
                                    Username: <input username="myUsername" />
                
                <Spacer height="20px" />
            
                Password: <input password="myPassword" />
            
               <Spacer height="20px" />
               
                <Link to="/AccessProjectPage">
                    <button>Sign Up</button>
                </Link>
            </BackgroundBox>

        </div>
    )

}

export default LoginPage;