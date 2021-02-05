import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Typography
} from '@material-ui/core'

const Container = styled.div`
    display: flex;
    padding: 7px 8px;
`

const ChildContent = styled.div`
    flex-grow: 1;
`

const PageHeader = ({
    title,
    subtitle,
    children
}) => {
    const formattedTitle = typeof(title) === 'object' ?
    (
        <FormattedMessage {...title} />
    ) : title

    const formattedSubtitle = typeof(subtitle) === 'object' ?
    (
        <FormattedMessage {...subtitle} />
    ) : subtitle

    return (
        <Container>
            <div>
                {formattedTitle && <Typography variant="h5" component="h1">
                    {formattedTitle}
                </Typography> }
                {formattedSubtitle && <Typography variant="body2" component="p">
                    {formattedSubtitle}
                </Typography>}
            </div>
            <ChildContent>
                {children}
            </ChildContent>
        </Container>
    )
}

PageHeader.propTypes = {

}

export default PageHeader