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

import OperationMasterList from '../OperationMasterList/OperationMasterList'

const Container = styled(Paper)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const OperationMapMaster = ({

}) => {

    return (
         <Container>
             <PageHeader
                title="Current activites"
             />
            
             <OperationMasterList
            />
         </Container>
    )
}

OperationMapMaster.propTypes = {

}

export default OperationMapMaster