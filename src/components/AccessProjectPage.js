import React, {useState} from 'react';
import BackgroundBox from './BackgroundBox.js';
import {Link} from "react-router-dom"
import {Button, TextField, Input} from '@mui/material';
import './styles.css';

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


    
    const createProject = () => {
        
    };

    const useProject = () => {
        
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
                            onChange = {updateName}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                        &nbsp;
                        <div> Desrc. &nbsp;
                            <TextField
                            value = {description}
                            onChange = {updateDecription}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                        &nbsp;
                        <div> ProjID &nbsp;
                            <TextField
                            value = {newProjectID}
                            onChange = {updateNewProjectID}
                            type="text"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                    </div>

                    <Button 
                    color = "primary"  
                    onClick = {createProject}
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
                            onChange = {updateExistingProjectID}
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
   <Button 
        color = "primary"   
        variant="Contained"
        >Back to Login Page</Button>

    </BackgroundBox>
    )
}

export default AccessProjectPage;
