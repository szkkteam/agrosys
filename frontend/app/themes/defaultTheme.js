import { createMuiTheme }  from '@material-ui/core/styles'
import { 
    topSpacingHeight,
    pagePadding,
    navrailWidth
} from './constants'
import globals from './globals'
//import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';

export default createMuiTheme({
    palette: {
      primary: { 500: '#239553' },
    },
    overrides: {
        ...globals
    },
    custom: {
        topSpacingHeight,
        pagePadding,
        navrailWidth
    }
  })