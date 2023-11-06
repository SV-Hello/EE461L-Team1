import React, {useState} from 'react';
import BackgroundBox from './BackgroundBox.js';
import {Link} from "react-router-dom"
import {Button, TextField, Input} from '@mui/material';
import './styles.css';
import axios from 'axios';

const AccessProjectPage = () => {
    const [name, setName] = useState('');
    const [description, setDescr] = useState('');
    const [newProjectID, setNewProjectID] = useState('');
    const [existingProjectID, setExistingProjectID] = useState('');

    const updateName = (e) => {
        setName(e.target.name);
    }
    const updateDecription = (e) => {
        setDescr(e.target.description);
    }
    const updateNewProjectID = (e) => {
        setNewProjectID(e.target.newProjectID);
    }
    const updateExistingProjectID = (e) => {
        setExistingProjectID(e.target.existingProjectID);
    }

    const logOut = () => {
        window.location.href = '/'
    };
    
    const createProject = () => {
        axios({
            method: "POST",
            url: "/createproj",
            data: {
                id: existingProjectID,
                description: description,
                name: name,
                hwSet1Cap: 100,
                hwSet2Cap: 100
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
    };

    const useProject = () => {
        axios({
            method: "POST",
            url: "/getProject",
            data: {
                id: existingProjectID
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
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100'
    };

    const cellStyle = {
        border: 'none',
        width: 'fit-content',
    };

    return(<BackgroundBox backgroundColor = '#7FFFD4'>
        <table style={tableStyle}>
            <tbody>
               
                <td style={cellStyle}>            
                    <div className="project_title_font">
                        Create New Project
                    </div>    

                    <div className='input-container'>
                        <div> Name &nbsp;
                            <TextField
                            value = {name}
                            onChange = {() => {updateName()}}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                        &nbsp;
                        <div> Desrc. &nbsp;
                            <TextField
                            value = {description}
                            onChange = {() => {updateDecription()}}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                        &nbsp;
                        <div> ProjID &nbsp;
                            <TextField
                            value = {newProjectID}
                            onChange = {() => {updateNewProjectID()}}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                    </div>

                    <Button 
                    color = "primary"  
                    onClick = {() => {createProject()}}
                    variant="contained"
                    >Create</Button>
                </td>
                
                &nbsp;&nbsp;
                
                <td style={cellStyle}>            
                    <div className="project_title_font">
                        Use Existing Project
                    </div>    

                    <div> ProjID &nbsp;
                            <TextField
                            value = {existingProjectID}
                            onChange = {() => {updateExistingProjectID()}}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        
                    </div>
            
                    <Button 
                    color = "primary"  
                    onClick = {useProject}
                    variant="contained"
                    >Use</Button>
                </td>
              
            </tbody>
    &nbsp;
    &nbsp;
    </table>

   {/*Currently does nothing*/}
   <button 
        color = "primary"   
        variant="Contained"
        onClick= {() => {logOut()}}>Back to Login Page</button>

    </BackgroundBox>
    )
}

export default AccessProjectPage;