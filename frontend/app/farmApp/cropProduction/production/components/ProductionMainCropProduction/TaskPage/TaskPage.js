import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import globalMessages from 'messages'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    SearchSelectField,
} from 'components/Form'

import { DetailFooter } from 'farmApp/components/Detail'

import { 
    TemplateSummaryList,
    TemplatePeriodSelector,
    TemplateFeatureSelector
} from 'farmApp/cropProduction/template/components'

import {
    Grid,
    FormControl,
    FormLabel,
    FormGroup,
} from '@material-ui/core'

import StepperFooter from '../StepperFooter'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
`


const ContentContainer = styled.div`
    padding: 10px 15px;
    flex-grow: 1;
`

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const TaskContainer = styled.div`
    flex-grow: 1;
`

const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'},
    {id: 2, title: 'Téli búza, No till'}
]

const FlexForm = styled(FormControl)`
    width: 100%;
`

const TaskPage = ({
    handleSubmit,
    onBack,
    // Form values
    template,

}) => {

    const containerRef = useRef(null)
    const [height, setHeight] = useState(500)

    useLayoutEffect(() => {
        if (containerRef && containerRef.inner) {
            const { clientHeight } = containerRef.inner
            setHeight(clientHeight)
        }
    })

    /**
     * TODO: 
     * Whenever any input value is changed here, dispatch an action to render the new template values.
     * The returned tempalte values should be stored in a redux state and used by the template summary
     */

    const handleFieldChange = (e, v, d ,c) => {
        console.debug("Field change: ", e, v, d, c)
        // TODO: Dispatch an action to fetch the new template details
    }

    return (
        <Form onSubmit={handleSubmit} >  
            <ContentContainer>
                <Container>
                    <Grid container spacing={3}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid container item xs={6} spacing={3}>
                                <Grid item xs={10}>
                                    <SearchSelectField name="template.base"
                                        //label={intl.formatMessage(messages.cropType)}
                                        label="Select template"
                                        //variant="outlined"
                                        disableClearable={true}
                                        formProps={{fullWidth: true}}
                                        options={templates}
                                        //idAccessor={(o) => o.id}
                                        groupBy={(option) => option.category}
                                        getOptionLabel={(option) => option.title}
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid container item xs={10}>
                                    <TemplatePeriodSelector name="template.configuration.startDate"
                                        onChange={handleFieldChange}
                                        startDate={template?.configuration?.startDate}
                                    />
                                </Grid>                  
                            </Grid>
                            <Grid container item xs={6}>
                                <TemplateFeatureSelector name="template.configuration.features"
                                    onChange={handleFieldChange}
                                    features={template?.configuration?.features}
                                />
                            </Grid>
                        </Grid>                
                    </Grid>
                    <TaskContainer ref={containerRef}>
                        <TemplateSummaryList />
                    </TaskContainer>
                </Container>
            </ContentContainer>
            <StepperFooter
                title={globalMessages.save}
            />
        </Form>
    )
}

TaskPage.propTypes = {

}

export default TaskPage