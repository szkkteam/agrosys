import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import SettingsIcon from '@material-ui/icons/Settings';

import {
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

import {
    IconButton
} from '@material-ui/core'

const PaddedHeader = styled(PageHeader)`
    ${Spacing}
`

const Spacer = styled.div`
    flex-grow: 1;
`


const DashboardLayout = ({
    overflow=true,
    sticky=true,
    headerProps={},
    header,
    toolbar,
    children,
}) => {

    return (
        <PageContent
            overflow={overflow}
        >
            <PaddedHeader
                spacing={[3,2]}
                {...headerProps}
            >
                <Spacer />
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </PaddedHeader>
            {toolbar &&<PageToolbar sticky={sticky}>
                {toolbar}
            </PageToolbar> }
            {children}
        </PageContent>
    )
}


DashboardLayout.propTypes = {
    overflow: PropTypes.bool,
    sticky: PropTypes.bool,
    headerProps: PropTypes.object,
    header: PropTypes.element,
    toolbar: PropTypes.element,
}

export default DashboardLayout