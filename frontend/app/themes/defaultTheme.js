import { createMuiTheme }  from '@material-ui/core/styles'
import { 
    topSpacingHeight,
    pagePadding,
    navrailWidth
} from './constants'
import globals from './globals'
//import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';

const mobile = 425

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
    },
    breakpoints: {
        values: {
            // Override defaults
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            // Generic breakpoints
            mobile: 600, //425,
            tablet: 960, //768,
            laptop: 1280, //1024,
            desktop: 1920, //2560,
            // Specific breakpoints
            navRailHide: 600,
            masterDetail: 768,
        }
    }
  })