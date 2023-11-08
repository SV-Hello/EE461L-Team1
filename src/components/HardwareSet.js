import React, {useState} from 'react';
import {Input} from '@mui/material';
import {Button} from '@mui/material';
import './styles.css';
import axios from 'axios';

{/*Component that isn't Projects*/}
function HardwareSet(props) {
    const [capacity, setCapacity] = useState(100);
    const [quantity, setQuantity] = useState(capacity);
    const [input, setInput] = useState('');

    {/*Custom event handler to modify component's state*/}
    const updateInput = (e) => {
        setInput(e.target.value);
    }
    
    function CheckIn() {
        axios({
            method: "POST",
            url: "/checkIn",
            data: {
                projectID: props.projName,
                set: props.hardwareNum,
                qnt: input
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
        if(response.data == "successful checkin"){
            let checking = parseInt(quantity) + parseInt(input);
            setQuantity(checking);
        }    
    }

    function CheckOut() {
        axios({
            method: "POST",
            url: "/checkOut",
            data: {
                projectID: props.projName,
                set: props.hardwareNum,
                qnt: input
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
        if(input == '') {
            alert("Invalid value!")
            return;
        }
        if(response.data == "successful checkout"){
            let checking = parseInt(quantity) - parseInt(input);
            setQuantity(checking);
        }
        else{
            /*print quantity requested is greater than that available, checked out all remaining units*/
            setQuantity(0);
        }
    }

    
    return(
        <div className = 'inline'>
            <div className="project_title_font">
                HWSet
                {props.hardwareNum || -1}
                : {quantity} / {capacity}
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
                onClick = {CheckIn}
                variant="outlined"
            >Check In</Button>
            &nbsp;
            <Button 
                color = "primary"  
                onClick = {CheckOut}
                variant="outlined"
            >Check Out</Button>
        </div>
            
    )
}

export default HardwareSet;
