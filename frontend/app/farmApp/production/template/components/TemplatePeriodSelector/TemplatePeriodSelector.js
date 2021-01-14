import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    BooleanComponent,
    TextComponent,
    //SearchSelectField,
    SearchSelectComponent,
    DatePickerField,
    DatePickerComponent,
} from 'components/Form'

import {
    Grid,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@material-ui/core'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
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
            <DatePickerComponent name="templateDate"
                label="Select date"
                formProps={{fullWidth: true}}
            />
        </Grid>
    )
}

const TemplatePeriodSelector = ({

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

TemplatePeriodSelector.propTypes = {

}

export default TemplatePeriodSelector