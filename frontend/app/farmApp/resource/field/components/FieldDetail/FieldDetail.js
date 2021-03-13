import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Tabs
} from 'components'

import {
    Grid
} from '@material-ui/core'

import FieldDetailGeneral from '../FieldDetailGeneral/FieldDetailGeneral'

const FieldDetail = ({

}) => {

    return (
        <Tabs
            divider
            tabs={[
                {title: messages.general},
            ]}
        >
            <FieldDetailGeneral
            />
        </Tabs>
    )
}

FieldDetail.propTypes = {

}

export default FieldDetail