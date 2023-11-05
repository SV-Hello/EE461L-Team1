import React, {useState} from 'react';
import {Input} from '@mui/material';
import {Button} from '@mui/material';
import './styles.css';

{/*Component that isn't Projects*/}
function HardwareSet(props) {
    const [capacity, setCapacity] = useState(100);
    const [quantity, setQuantity] = useState(capacity);
    const [input, setInput] = useState('');

    {/*Custom event handler to modify component's state*/}
    const updateInput = (e) => {
        setInput(e.target.value);
    }

    const CheckIn = () => {
        if(input == '') {
            alert("Invalid value!")
            return;
        }
        
        let checking = parseInt(quantity) + parseInt(input);

        if(checking > capacity)
            setQuantity(100);
        else   
            setQuantity(checking);
    };
    
    const CheckOut = () => {
        if(input == '') {
            alert("Invalid value!")
            return;
        }

        let checking = parseInt(quantity) - parseInt(input);

        if(checking < 0)
            setQuantity(0);
        else   
            setQuantity(checking);
    };

    
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
