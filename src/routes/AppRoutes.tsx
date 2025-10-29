import { useRoutes } from "react-router-dom"

import { ImageApp } from "../ImageApp"
import { RobotComponent } from "../imagesComponents"

export const AppRoutes = () => {
  
    const routes = useRoutes([
        {
            path: '/',
            element: <ImageApp />
        },
        {
            path: '/robot-component',
            element: <RobotComponent />
        },
        {
            path:'*',
            element: <div>pagina no encontrada - 404</div>
        }
    ]);

    return routes;
}
