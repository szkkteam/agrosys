import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    BooleanComponent,
    TextComponent,
    SearchSelectField,
    SearchSelectComponent,
    DatePickerField,
    DatePickerComponent,
    RadioGroupField,
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


const DATE_AUTOMATIC = "automatic"
const DATE_MANUAL = "manual"
const DATE_KEY_EVENT = "keyEvent"

const dateKeys = [
    {id: 1, title: 'Sowing'},
    {id: 2, title: 'Harvest'},
]

const DateKeyEvent = ({
    name,
    onChange,
}) => {
    return (
        <>            
            <Grid item xs={12}>
                <DatePickerField name={`${name}.date`}
                    onChange={onChange}
                    label="Select date"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <SearchSelectField name={`${name}.keyEvent`}
                    onChange={onChange}
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
        </>
    )
}

const DateManual = ({
    name,
    onChange
}) => {
    return (
        <Grid item xs={12}>
            <DatePickerField name={`${name}.date`}
                onChange={onChange}
                label="Select date"
                formProps={{fullWidth: true}}
            />
        </Grid>
    )
}

const TemplatePeriodSelector = ({
    name="",
    onChange,
    startDate,
    ...props
}) => {

    const getContent = () => {
        switch(startDate?.mode) {
            case DATE_AUTOMATIC:
                return 'div'
            case DATE_MANUAL:
                return DateManual
            case DATE_KEY_EVENT:
                return DateKeyEvent
            default:
                return 'div'
        }
    }

    const Content = getContent()

    return (
        <>
            <Grid item xs={4}>
                <RadioGroupField name={`${name}.mode`}
                    onChange={onChange}
                    formLabel={
                        <FormLabel component="legend">
                            Date calculation
                        </FormLabel>
                    }
                >
                    <FormControlLabel 
                        label="Automatic" 
                        value={DATE_AUTOMATIC} 
                        control={
                            <Radio />
                        }                             
                    />
                    <FormControlLabel 
                        disabled // TODO: Implement this feature
                        label="Fixed" 
                        value={DATE_MANUAL} 
                        control={
                            <Radio />
                        }
                    />
                    <FormControlLabel 
                        disabled // TODO: Implement this feature
                        label="Key event" 
                        value={DATE_KEY_EVENT}
                        control={
                            <Radio />
                        }
                    />
                </RadioGroupField>                
            </Grid>
            <Grid container item xs={8}>
                <Content
                    name={`${name}.parameters`}
                    onChange={onChange}
                />
            </Grid>
        </>
    )
}

TemplatePeriodSelector.propTypes = {

}

export default TemplatePeriodSelector