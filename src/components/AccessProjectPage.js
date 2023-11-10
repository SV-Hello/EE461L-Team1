import React, {useState} from 'react';
import BackgroundBox from './BackgroundBox.js';
import {Link, useNavigate} from "react-router-dom"
import {Button, TextField, Input} from '@mui/material';
import './styles.css';
import axios from 'axios';

const AccessProjectPage = () => {
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        newProjectID: "",
        existingProjectID: ""
    });

    function handleChange(event) { 
        const {value, name} = event.target
        setProjectData(prevNote => ({
            ...prevNote, [name]: value})
        )
    }
    
    function createProject() {
        axios({
            method: "POST",
            url: "/createproj",
            data: {
                id: projectData.newProjectID,
                description: projectData.description,
                name: projectData.name,
                hwSet1Cap: 100,
                hwSet2Cap: 100
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.result == "success") {
                navigate(`/projects/${projectData.newProjectID}`);
            }
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
        })
    }

    function getProject() {
        axios({
            method: "POST",
            url: "/getProject",
            data: {
                id: projectData.existingProjectID
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.result == "success") {
                navigate(`/projects/${projectData.existingProjectID}`);
            }
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
                            value = {projectData.name}
                            onChange = {handleChange}
                            type="text"
                            name="name"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                        &nbsp;
                        <div> Desc &nbsp;
                            <TextField
                            value = {projectData.description}
                            onChange = {handleChange}
                            type="text"
                            name="description"
                            variant="outlined"
                            size="small"></TextField>
                        </div>
                        &nbsp;
                        <div> ProjID &nbsp;
                            <TextField
                            value = {projectData.newProjectID}
                            onChange = {handleChange}
                            type="text"
                            name="newProjectID"
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
                            value = {projectData.existingProjectID}
                            onChange = {handleChange}
                            type="text"
                            name="existingProjectID"
                            variant="outlined"
                            size="small"></TextField>
                        
                    </div>
            
                    <Button 
                    color = "primary"  
                    onClick = {getProject}
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