import React, { useEffect, useState } from 'react';
import BackgroundBox from './BackgroundBox.js';
import HardwareSet from './HardwareSet.js';
import axios from 'axios';
import {Button} from '@mui/material';
import {Link, useParams, useNavigate} from "react-router-dom"

const Project = () => {
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
    });

    const {projectID} = useParams();

    useEffect(() => {
        axios({
            method: "POST",
            url: `/getproj/${projectID}`,
            data: {
                params: ["name", "description"]
            }
        }).then((response) => {
            setProjectData(response.data)
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
        });
    }, []);

    function exitProject() {navigate("/AccessProjectPage");}

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100'
    };

    const cellStyle = {
        border: 'none',
        width: 'fit-content',
    };

    return(
        <BackgroundBox backgroundColor = '#7FFFD4'>

            <div className="project_title_font">
                ProjectID: {projectID || -1}
            </div>

            <div className="project_title_font">
                Name: {projectData.name}
            </div>

        <table style={tableStyle}>
            <tbody>
                <td style={cellStyle}>
                    <HardwareSet hardwareNum = {1} projectID={projectID}></HardwareSet>
                    <HardwareSet hardwareNum = {2} projectID={projectID}></HardwareSet>     
                </td>
            </tbody>
        </table>

        {/*Currently does nothing*/}
        <Button
        onClick = {exitProject} 
        color = "primary"   
        variant="Contained"
        >Back to Project Access Page</Button>

        </BackgroundBox>

    )
}

export default Project;
