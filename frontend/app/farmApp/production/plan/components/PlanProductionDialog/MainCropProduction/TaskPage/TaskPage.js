import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    HiddenField,
    TextComponent,
    //SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import { TemplateSummaryList } from 'farmApp/production/template/components'

import {
    Grid
} from '@material-ui/core'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`


const TaskContainer = styled.div`
    flex-grow: 1;
`

const options = [
    {id: 1, title: 'Bakhatás művelés'},
    {id: 1, title: 'Szántás'},
    {id: 1, title: 'No till (Művelés nélküli direktvetés)'},
]

const TaskPage = ({

}) => {

    const containerRef = useRef(null)
    const [height, setHeight] = useState(500)

    useLayoutEffect(() => {
        if (containerRef && containerRef.inner) {
            const { clientHeight } = containerRef.inner
            setHeight(clientHeight)
        }
    })

    return (
        <Container>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid container item xs={4} spacing={3}>
                        <Grid item xs={6}>
                            <SearchSelectComponent name="cropType"
                                //label={intl.formatMessage(messages.cropType)}
                                label="Művelési mód"
                                //variant="outlined"
                                disableClearable={true}
                                formProps={{fullWidth: true}}
                                options={options}
                                //idAccessor={(o) => o.id}
                                groupBy={(option) => option.category}
                                getOptionLabel={(option) => option.title}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextComponent name="cropType"
                                label="Start date"
                                formProps={{fullWidth: true}}
                            />
                        </Grid>
                    </Grid>

                </Grid>                
            </Grid>
            <TaskContainer ref={containerRef}>
                <TemplateSummaryList />
            </TaskContainer>
        </Container>
    )
}

TaskPage.propTypes = {

}

export default TaskPage