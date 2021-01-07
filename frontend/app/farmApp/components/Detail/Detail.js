import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

//import { Modal } from 'site/components'
import DetailHeader from './DetailHeader'
import DetailFooter from './DetailFooter'
import DetailContainer from './DetailContainer'
import DetailContext from './DetailContent'

import {
    DialogTitle
} from '@material-ui/core';

const Container = styled.div`

`

const Detail = ({
    onClose,
    footerProps,
    children,
    ...props
}) => {

    return (
        <Container>          
            <DetailHeader
                onClose={onClose}
                {...props}
            />
                {children}
            <DetailFooter
                onClose={onClose}
                {...footerProps}
            />
        </Container>
    )
}


Detail.propTypes = {

}

export default Detail