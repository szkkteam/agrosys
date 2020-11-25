import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const WorkersFilter = ({

}) => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            //alignItems="center"
        >
            <Grid item xs={12}>
                <TextField id="standard-basic" label="Standard" />
            </Grid>
            <Grid item xs={6}>
            <TextField id="standard-basic" label="Standard" />
            </Grid>
            <Grid item xs={6}>
            <TextField id="standard-basic" label="Standard" />
            </Grid>
            <Grid item xs={12}>
                <p>Some property</p>
            </Grid>
            <Grid item xs={12}>
                <p>Some property</p>    
            </Grid>
            <Grid item xs={6}>
                <p>Some property</p>
            </Grid>
            <Grid item xs={6}>
                <p>Some property</p>
            </Grid>
        </Grid>   
    )
}

WorkersFilter.propTypes = {

}

export default WorkersFilter