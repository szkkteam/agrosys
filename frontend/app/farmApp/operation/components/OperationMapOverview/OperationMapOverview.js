import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    MasterDetail
} from 'components'

import OperationMapMaster from '../OperationMapMaster/OperationMapMaster'
import OperationMapDetail from '../OperationMapDetail/OperationMapDetail'

const OperationMapOverview = ({

}) => {

    return (
        <MasterDetail
            spacing={0}
        >
            <OperationMapMaster
            />
            <OperationMapDetail
            />
        </MasterDetail>
    )
}

OperationMapOverview.propTypes = {

}

export default OperationMapOverview