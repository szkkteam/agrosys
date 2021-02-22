import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    SearchSelectField,
} from 'components/Form'

import { useFetchCropTypes } from '../../../hooks'

const CropSelect = ({
    ...props

}) => {

    const intl = useIntl()

    const {payload: cropTypes, isLoading } = useFetchCropTypes()

    return (
        <SearchSelectField name="cropType"            
            label={intl.formatMessage(messages.cropType)}
            loading={isLoading}
            variant="outlined"
            formProps={{fullWidth: true}}
            options={cropTypes}
            //idAccessor={(o) => o.id}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            {...props}
        />
    )
}
/* TODO: Post request as array, not supported.
                    <Grid item xs={1}>
                        <IconButton>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
*/

CropSelect.propTypes = {

}

export default CropSelect