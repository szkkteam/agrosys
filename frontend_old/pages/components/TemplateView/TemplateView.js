import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    TemplateCreateButtonContainer,
    TemplateContainer,
    TemplateListContainer,
} from 'template/components'

import {
    createTemplateEnums
} from 'template/constants'

export default (
    
) => {
    return (
        <Grid
            container
            direction="row"
            style={{overflowX: "hidden", maxHeight: "900px"}}
        >
            <Grid item sm={2}>
                <TemplateCreateButtonContainer                    
                />
                <TemplateListContainer
                />
            </Grid>
            <Grid item sm={10}>
                <TemplateContainer
                />
            </Grid>
        </Grid>
    )
}
