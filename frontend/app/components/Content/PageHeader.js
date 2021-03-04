import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { fade } from '@material-ui/core/styles/colorManipulator';

import {
    Typography
} from '@material-ui/core'

import Breadcrumbs from '../Breadcrumb/Breadcrumb'

const Container = styled.div` 
    ${spacing}
    display: flex;
    align-items: center;
    //padding: 7px 8px;
`

const ChildContent = styled.div`
    flex-grow: 1;
    display: flex;
`

const SubHeader = styled(Typography)`
    ${({theme}) => `
        color: ${theme.palette.text.secondary};
    `}
    
`

const PageHeader = ({
    noWrap=false,
    title,
    breadcrumbs,
    subheader,
    children,
    ...props
}) => {
    const formattedTitle = typeof(title) === 'object' ?
    (
        <FormattedMessage {...title} />
    ) : title

    const formattedSubheader = typeof(subheader) === 'object' ?
    (
        <FormattedMessage {...subheader} />
    ) : subheader

    console.debug("children: ", children)

    return (
        <Container {...props}>
            <div>
                {breadcrumbs && 
                    <Breadcrumbs
                        {...breadcrumbs}
                    />
                }
                {formattedTitle && <Typography variant="h5" component="h1" noWrap={noWrap}>
                    {formattedTitle}
                </Typography> }
                {formattedSubheader && <SubHeader variant="body1" component="p" noWrap={noWrap}>
                    {formattedSubheader}
                </SubHeader>}
            </div>
            <ChildContent>
                {children}
            </ChildContent>
        </Container>
    )
}

PageHeader.propTypes = {
    breadcrumbs: Breadcrumbs.propTypes,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    subheader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
}

export default PageHeader