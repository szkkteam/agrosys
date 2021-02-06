import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import {
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

const PaddedHeader = styled(PageHeader)`
    ${Spacing}
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

            </PaddedHeader>
            {toolbar &&<PageToolbar sticky={sticky}>
                {toolbar}
            </PageToolbar> }
            <div>
                {children}
            </div>
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