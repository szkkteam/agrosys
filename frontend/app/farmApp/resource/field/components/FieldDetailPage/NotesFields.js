import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import messages from './messages';

import {
    Grid,
    FormControl,
    FormLabel
} from '@material-ui/core';

import { 
    HiddenField,
    TextField,
} from 'components/Form'

const NotesFields = ({
    className,
    name,
    ...rest 
}) => {

    const intl = useIntl()

    return (      
        <TextField name={`${name}.notes`}
            label="Notes"
            multiline
            rows={6}
            variant="outlined"
            formProps={{fullWidth: true}}
        />
    ) 
}

NotesFields.propTypes = {

}

export default NotesFields