import React from 'react';
import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';

const Spacer = ({ height, width }) => {
    return <div style={{ height, width }}></div>;
  };

const Project = () => {

    return(
        <div>
            <BackgroundBox>

                <Shape width = "600px" height = "35px" text = "Project: *projectID*"></Shape>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [Capacity]
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [Avalibility]
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [Request]
                <Spacer height="2px" />
                HWSet1:
                <input username="myUsername" />
                <input username="myUsername" />
                <input username="myUsername" />

                <Spacer height="10px" />
                HWSet2:
                <input username="myUsername" />
                <input username="myUsername" />
                <input username="myUsername" />

                <Spacer height="10px" />
                <button>Check-In</button>
                <button>Check-Out</button>
            </BackgroundBox>

        </div>
    )

}

export default Project;