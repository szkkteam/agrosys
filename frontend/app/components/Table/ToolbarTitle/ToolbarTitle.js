import React from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Typography } from '@material-ui/core';

const Title = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ToolbarTitle = ({
    title,
    ...props
}) => {
    
    return (
        <div {...props}>
            { typeof title === "object" ? (
                <Title
                variant="h6"
                >
                    <FormattedMessage {...title} />
                </Title>
            ) : (
                title
            ) }
        </div>
    )
}

ToolbarTitle.propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
}

export default ToolbarTitle
