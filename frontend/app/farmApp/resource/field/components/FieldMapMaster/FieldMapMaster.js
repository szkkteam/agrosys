import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    PageHeader 
} from 'components'

import {
    Paper,
    Typography
} from '@material-ui/core'

import FieldMasterList from '../FieldMasterList/FieldMasterList'

const Container = styled(Paper)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const FieldMapMaster = ({

}) => {

    return (
         <Container>
             <PageHeader
                p={2}
                title={messages.title}
             />
            
             <FieldMasterList
            />
         </Container>
    )
}

FieldMapMaster.propTypes = {

}

export default FieldMapMaster