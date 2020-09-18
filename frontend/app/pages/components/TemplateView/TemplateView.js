import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    AddTemplateButton,
    TemplateContainer,
    TemplateListContainer,
} from 'template/components'

import {
    createTemplateEnums
} from 'template/constants'

export default (
    
) => {

    const [createState, setCreateState] = React.useState(createTemplateEnums.IDLE)

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
                <TemplateContainer
                    createState={createState}
                    onCloseModal={() => setCreateState(createTemplateEnums.CREATE_FROM_SCRATCH)}
                    onCancel={() => setCreateState(createTemplateEnums.IDLE)}
                />
            </Grid>
        </Grid>
    )
}
