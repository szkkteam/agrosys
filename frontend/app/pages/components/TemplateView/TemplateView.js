import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    AddTemplateButton,
    TemplateCreateContainer,
    TemplateListContainer,
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
                <div style={{marginBottom: "75px"}}>
                    <AddTemplateButton
                        onClick={(e, i) => setCreateState(i.key)}
                    />
                </div>
                <TemplateListContainer
                />
            </Grid>
            <Grid item sm={10}>
                { createState !== createTemplateEnums.IDLE &&
                    <TemplateCreateContainer
                        onCancel={() => setCreateState(createTemplateEnums.IDLE)}
                    />
                }
            </Grid>
        </Grid>
    )
}
