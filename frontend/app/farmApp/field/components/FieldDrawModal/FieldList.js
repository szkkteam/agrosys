import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import messages from './messages'

import {
    Typography,
} from '@material-ui/core';


import { 
    MasterList
} from 'components'

import {
    FieldListItem
} from '../../components'

const Title = styled(Typography)`
    padding: 15px 0 10px 10px;
`

const FieldList = ({
    ...props
}) => {

    return (
        <>            
            <Title variant="h6">
                <FormattedMessage {...messages.fieldListTitle}/>
            </Title>
            <MasterList
                options={{
                    maxHeight: 1100,
                }}
                {...props}
            >
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
            </MasterList>
        </>
    )
}


FieldList.propTypes = {

}

export default FieldList