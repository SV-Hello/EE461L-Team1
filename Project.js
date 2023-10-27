import React from 'react';
import BackgroundBox from './BackgroundBox.js';
import HardwareSet from './HardwareSet.js';
import {Button} from '@mui/material';

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
        <BackgroundBox backgroundColor = '#7FFFD4'> {/*Passing props from parent to child*/}

        <table style={tableStyle}>
            <tbody>
                <tr>
                <td style={cellStyle}>
                    <div className="project_title_font">
                    {props.projName || -1}
                    </div>                        
                </td>

                <td style={cellStyle}>
                    <div className="auth_users_font">
                    list, of, authorized, users
                    </div>
                 </td>
                
                <td style={cellStyle}>
                    {/*Custom component used multiple times*/}
                    {/*Passing props from parent to child*/}
                    <HardwareSet hardwareNum = '1'></HardwareSet>
                    <HardwareSet hardwareNum = '2'></HardwareSet>     
                </td>

                <td style={cellStyle}>
                    <Button 
                        color = "primary" 
                        variant = "contained"
                    >Join</Button>
                </td>
                </tr>
            </tbody>
            </table>

        </BackgroundBox>
    )
}

export default Project;
