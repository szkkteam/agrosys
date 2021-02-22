import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import AddCircleIcon from '@material-ui/icons/AddCircle';

import { 
    HiddenField,
    TextField,
    SearchSelectField,
} from 'components/Form'

const templates = [
    {id: 1, title: 'Wheat 2019, 35ha'},
    {id: 2, title: 'Wheat 2018, 15ha'},
    {id: 3, title: 'Winter wheat 2018, 20ha'},
]

const SeasonSelector = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <SearchSelectField name="seasonTemplate"
            label={intl.formatMessage(messages.seasonTemplate)}
            variant="outlined"
            formProps={{fullWidth: true}}
            options={templates}
            idAccessor={(o) => o.id}
            getOptionLabel={(option) => option.title}
            {...props}
        />
    )
}

SeasonSelector.propTypes = {

}

export default SeasonSelector