import HomeIcon from "@material-ui/icons/Home";
import { ROUTES } from 'routes'

var onClick = () => {
    
}

export const FarmMenu = {
      name: "farm", 
      Icon: HomeIcon, 
      route: ROUTES.Farms,
      items: [
        { name: "statements", label: "Statements", onClick },
        { name: "reports", label: "Reports", onClick }
      ]    
}