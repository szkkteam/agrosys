import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    AddTemplateButton,
    TemplateCreateContainer
} from 'template/components'

import {
    createTemplateEnums
} from 'template/constants'

export default (
    
) => {

    const [createState, setCreateState] = React.useState(createTemplateEnums.IDLE)

    console.log("createState: ", createState)

    return (
        <Grid
            container
            direction="row"
            style={{overflowX: "hidden", maxHeight: "900px"}}
        >
            <Grid item sm={2}>
                <div>
                    <AddTemplateButton
                        onClick={(e, i) => setCreateState(i.key)}
                    />
                </div>
            </Grid>
            <Grid item sm={10}>
                { createState !== createTemplateEnums.IDLE &&
                    <TemplateCreateContainer />
                }
            </Grid>
        </Grid>
    )
}
