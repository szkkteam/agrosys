import React from 'react'
import Grid from '@material-ui/core/Grid';


export default ({ children }) => {
    return (
        <Grid item xs={12} >
            {children}
        </Grid>
    )
  }
  