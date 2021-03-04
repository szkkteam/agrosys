import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { 
    PageHeader,
    PageContent,
} from 'components'

const Spacer = styled.div`
    flex-grow: 1;
`


const MinimalLayout = ({
    containerProps={},
    tabs,
    action,
    overflow=false,
    children,
    ...props
}) => {

    return (
        <PageContent
            overflow={overflow}
            px={2}
            {...containerProps}
        >
            <PageHeader
                py={2}
                {...props}
            >
                <Spacer/>
                {action}
            </PageHeader>
            {children}
        </PageContent>
    )
}

MinimalLayout.propTypes = {    
    ...PageHeader.propTypes,
    containerProps: PageContent.propTypes,
    overflow: PropTypes.bool
}

export default MinimalLayout