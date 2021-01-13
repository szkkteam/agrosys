import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    BooleanComponent,
    TextComponent,
    //SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import { 
    TemplateSummaryList,
    TemplatePeriodSelector
} from 'farmApp/production/template/components'

import {
    Grid,
    FormControl,
    FormLabel,
    FormGroup,
} from '@material-ui/core'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
`


const TaskContainer = styled.div`
    flex-grow: 1;
`

const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'}
]

const FlexForm = styled(FormControl)`
    width: 100%;
`

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
            <Grid container spacing={3}>
                <Grid container item xs={12} spacing={3}>
                    <Grid container item xs={6} spacing={3}>
                        <Grid item xs={10}>
                            <SearchSelectComponent name="cropType"
                                //label={intl.formatMessage(messages.cropType)}
                                label="Select template"
                                //variant="outlined"
                                disableClearable={true}
                                formProps={{fullWidth: true}}
                                options={templates}
                                //idAccessor={(o) => o.id}
                                groupBy={(option) => option.category}
                                getOptionLabel={(option) => option.title}
                            />
                        </Grid>
                        <Grid container item xs={10}>
                            <TemplatePeriodSelector />
                        </Grid>                  
                    </Grid>
                    <Grid container item xs={6}>
                        <FlexForm component="fieldset">
                            <FormLabel component="legend">
                                Select features
                            </FormLabel>
                            <FormGroup>
                                <BooleanComponent name="test" label="Műtrágya" />
                                <BooleanComponent name="test" label="Vegyszeres kezelések" />
                            </FormGroup>
                        </FlexForm>
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