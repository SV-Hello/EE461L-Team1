import React from 'react';
import Project from './Project.js'

const AccessProjectPage = () => {

    return(
        <div>

        <div className="title_font">
              Projects
        </div>
          
        <Project projName = 'Project Name 1'></Project>
        <Project projName = 'Project Name 2'></Project>
            
        </div>
    )

}

export default AccessProjectPage;