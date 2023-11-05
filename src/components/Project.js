import React from 'react';
import BackgroundBox from './BackgroundBox.js';
import HardwareSet from './HardwareSet.js';
import {Button} from '@mui/material';
import {Link} from "react-router-dom"

function Project(props) {
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
                ProjectID: {props.projName || -1}
            </div>  

        <table style={tableStyle}>
            <tbody>
               
                <td style={cellStyle}>            
                    <HardwareSet hardwareNum = '1'></HardwareSet>
                    <HardwareSet hardwareNum = '2'></HardwareSet>     
                </td>
              
            </tbody>
        </table>

        {/*Currently does nothing*/}
        <Button 
        color = "primary"   
        variant="Contained"
        >Back to Project Access Page</Button>

        </BackgroundBox>

    )
}

export default Project;
