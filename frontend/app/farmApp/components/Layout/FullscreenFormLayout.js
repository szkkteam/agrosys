import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import {
    PageHeader,
    PageContent,
} from 'components'

const PaddedHeader = styled(PageHeader)`
    ${Spacing}
`


const FullscreenFormLayout = ({
    overflow='auto',
    headerProps={},
    children,
}) => {

    return (
        <PageContent
            overflow={overflow}
        >
            <PageContent className="MuiPaper-root MuiPaper-rounded MuiPaper-elevation2" margin={[1, 2]}>
                <PaddedHeader
                    spacing={[3,2]}
                    {...headerProps}
                >                
                </PaddedHeader>            
                {children}
            </PageContent>
        </PageContent>
    )
}


FullscreenFormLayout.propTypes = {
    overflow: PropTypes.bool,
    sticky: PropTypes.bool,
    headerProps: PropTypes.object,
}

export default FullscreenFormLayout