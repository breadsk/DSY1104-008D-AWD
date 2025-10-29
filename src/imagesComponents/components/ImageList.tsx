import { useNavigate } from 'react-router-dom';

import type { 
        robotsProps        
    } from '../../interfaces/images.interfaces';


interface Props {
    robots:robotsProps[] | robotsProps
}


export const ImageList = ({ robots }:Props) => {

  const navigate = useNavigate();
  
  const robotsArray = Array.isArray(robots) ? robots : [robots];

  const handleSearhRobot = (robot:robotsProps) => {
    navigate('/robot-component', {
        state: {
            robot:robot
        }
    })
  }


  return (
     <div className="gifs-container">
         {
            robotsArray.map((robot) => {
                return (
                    <div key={robot.id} className="gif-card">
                        <img 
                            onClick={ () => {
                                handleSearhRobot(robot);
                            } }
                            src={robot.avatar} alt={robot.name} />
                        <h3>{robot.name}</h3>
                    </div>
                )
            })
        }
    </div>
  )
}
