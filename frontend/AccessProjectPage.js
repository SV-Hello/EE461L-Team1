import React from 'react';
import Shape from './Shape.js'
import BackgroundBox from './BackgroundBox.js';

const Spacer = ({ height, width }) => {
    return <div style={{ height, width }}></div>;
  };

const AccessProjectPage = () => {

    return(
        <div>

            <BackgroundBox>

                <Shape width = "400px" height = "35px" text = "Create New Project"></Shape>

                Name: <input name="myName" />
                <Spacer height="20px" />
                Description: <input descr="myDescr" />
                <Spacer height="20px" />
                Project ID: <input projID="myProjID" />

            </BackgroundBox>

            <BackgroundBox>

                <Shape width = "400px" height = "35px" text = "Use Existing Project:"></Shape>
                Project ID: <input projID="myProjID" />
                
            </BackgroundBox>
            
        </div>
    )

}

export default AccessProjectPage;
