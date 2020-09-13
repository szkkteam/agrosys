import React from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './createstep.scss'

export default ({
    onClickFromScratch,
    onClickFromTemplate,
}) => {
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                className="create-template"
            >
                <Grid item xs={6}>
                    <Button 
                        className="center"
                        variant="contained"
                        color="primary"
                        onClick={onClickFromScratch}
                    >
                        Template from scracth
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        className="center"
                        variant="contained"
                        color="primary"
                        onClick={onClickFromTemplate}
                    >
                        Template from another
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}