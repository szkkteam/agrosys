import React from 'react'
import Grid from '@material-ui/core/Grid';

/*
        <Grid container direction="row" alignItems="center" justify="space-evenly" style={{position: "relativ"}}>
            {children}
        </Grid>
*/
export default ({ children }) => {
    return (
        <div style={{position: "relative"}}>
            {children}
        </div>
    )
  } 
  