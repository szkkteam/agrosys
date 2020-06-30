import React from 'react'

import Grid from '@material-ui/core/Grid';

export default ({children, leftSize, rightSize, ...rest}) => {
    return (
        <Grid
            container
            direction="row"
        >
            <Grid item sm={leftSize}>
                {React.cloneElement(children[0], {...rest})}
            </Grid>
            <Grid item sm={rightSize}>
                {React.cloneElement(children[1], {...rest})}
            </Grid>
        </Grid>
    )
}