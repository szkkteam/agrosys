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

import { TemplateSummaryList } from 'farmApp/production/template/components'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    Grid,
    FormControl,
    FormLabel,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup
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

const options = [
    {id: 1, title: 'Bakhatás művelés'},
    {id: 1, title: 'Szántás'},
    {id: 1, title: 'No till (Művelés nélküli direktvetés)'},
]

const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'}
]

const FlexForm = styled(FormControl)`
    width: 100%;
`

const DATE_AUTOMATIC = "DATE_AUTOMATIC"
const DATE_MANUAL = "DATE_MANUAL"
const DATE_KEY_EVENT = "DATE_KEY_EVENT"

const dateKeys = [
    {id: 1, title: 'Sowing'},
    {id: 2, title: 'Harvest'},
]

const DateKeyEvent = ({

}) => {
    return (
        <>
            <Grid item xs={12}>
                <SearchSelectComponent name="cropType"
                    //label={intl.formatMessage(messages.cropType)}
                    label="Select template"
                    //variant="outlined"
                    disableClearable={true}
                    formProps={{fullWidth: true}}
                    options={dateKeys}
                    //idAccessor={(o) => o.id}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.title}
                />
            </Grid>
            <Grid item xs={12}>
                <TextComponent name="cropType"
                    label="Select date"
                    formProps={{fullWidth: true}}
                />
            </Grid>
        </>
    )
}

const DateManual = ({

}) => {
    return (
        <Grid item xs={12}>
            <TextComponent name="cropType"
                label="Select date"
                formProps={{fullWidth: true}}
            />
        </Grid>
    )
}

const DateOptionSelector = ({

}) => {

    const [value, setValue] = useState(DATE_AUTOMATIC)

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    console.debug("Value: ", value)

    const getContent = () => {
        switch(value) {
            case DATE_AUTOMATIC:
                return 'div'
            case DATE_MANUAL:
                return DateManual
            case DATE_KEY_EVENT:
                return DateKeyEvent
        }
    }

    const Content = getContent()

    return (
        <>
        <Grid item xs={4}>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    Date calculation
                </FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value={DATE_AUTOMATIC} control={<Radio />} label="Automatic" />
                    <FormControlLabel value={DATE_MANUAL} control={<Radio />} label="Fixed" />
                    <FormControlLabel value={DATE_KEY_EVENT} control={<Radio />} label="Key event" />
                </RadioGroup>
            </FormControl>
        </Grid>
        <Grid container item xs={8}>
            <Content
            />
        </Grid>
        </>
    )
}

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
                            <DateOptionSelector />
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

/*
                            <TextComponent name="cropType"
                                label="Start date"
                                formProps={{fullWidth: true}}
                            />
*/

TaskPage.propTypes = {

}

export default TaskPage