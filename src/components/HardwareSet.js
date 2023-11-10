import React, {useState, useEffect} from 'react';
import {Input} from '@mui/material';
import {Button} from '@mui/material';
import './styles.css';
import axios from 'axios';

const HardwareSet = (props) => {
    const [projectData, setProjectData] = useState({
        capacity: 0,
        quantity: 0,
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        axios({
            method: "POST",
            url: `/getproj/${props.projectID}`,
            data: {
                params: [`hwSet${props.hardwareNum}Availability`, `hwSet${props.hardwareNum}Capacity`]
            }
        }).then((response) => {
            setProjectData({
                quantity: response.data[`hwSet${props.hardwareNum}Availability`],
                capacity: response.data[`hwSet${props.hardwareNum}Capacity`]
            });
            console.log(projectData);
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
        });
    }, []);

    const updateInput = (e) => {
        setInput(e.target.value);
    }
    
    // function CheckIn() {
    //     axios({
    //         method: "POST",
    //         url: "/checkIn",
    //         data: {
    //             projectID: props.projName,
    //             set: props.hardwareNum,
    //             qnt: input
    //         }
    //     }).then((response) => {
    //         console.log(response.data)
    //     }).catch((error) => {
    //         if (error.response) {
    //           console.log(error.response)
    //           console.log(error.response.status)
    //           console.log(error.response.headers)
    //         }
    //     })
    //     // if(response.data == "successful checkin"){
    //     //     let checking = parseInt(quantity) + parseInt(input);
    //     //     setQuantity(checking);
    //     // }    
    // }

    // function CheckOut() {
    //     axios({
    //         method: "POST",
    //         url: "/checkOut",
    //         data: {
    //             projectID: props.projName,
    //             set: props.hardwareNum,
    //             qnt: input
    //         }
    //     }).then((response) => {
    //         console.log(response.data)
    //     }).catch((error) => {
    //         if (error.response) {
    //           console.log(error.response)
    //           console.log(error.response.status)
    //           console.log(error.response.headers)
    //         }
    //     })
    //     if(input == '') {
    //         alert("Invalid value!")
    //         return;
    //     }
    //     // if(response.data == "successful checkout"){
    //     //     let checking = parseInt(quantity) - parseInt(input);
    //     //     setQuantity(checking);
    //     // }
    //     else{
    //         /*print quantity requested is greater than that available, checked out all remaining units*/
    //         setQuantity(0);
    //     }
    // }

    
    return(
        <div className = 'inline'>
            <div className="project_title_font">
                HWSet
                {props.hardwareNum}
                : {projectData.quantity} / {projectData.capacity}
             </div>
                    
        
             <Input 
                placeholder="Enter qty"
                type = "number"
                value = {input}
                onChange = {updateInput}
             />
            &nbsp;

            <Button 
                color = "primary"  
                // onClick = {CheckIn}
                variant="outlined"
            >Check In</Button>
            &nbsp;
            <Button 
                color = "primary"  
                // onClick = {CheckOut}
                variant="outlined"
            >Check Out</Button>
        </div>
            
    )
}

export default HardwareSet;
