import React from 'react';
import Project from './Project.js'
import {Link} from "react-router-dom"

const AccessProjectPage = () => {

    return(
        <div>

        <div className="title_font">
              Projects
        </div>
          
        <Project projName = 'Project Name 1'></Project>
        <Project projName = 'Project Name 2'></Project>
            <Link to="/">
                    <button>Log out</button>
        </Link>
        </div>
    )

}

export default AccessProjectPage;