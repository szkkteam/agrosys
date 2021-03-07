import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import PageHeader, { PageHeaderPropTypes } from 'components/Content/PageHeader'
import PageContent, { PageContentPropTypes } from 'components/Content/PageContent'

const Spacer = styled.div`
    flex-grow: 1;
`


const MinimalLayout = ({
    containerProps={},
    tabs,
    action,
    overflow='hidden',
    children,
    ...props
}) => {

    return (
        <PageContent
            px={2}
            overflow={overflow}
        >
            <PageContent
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
        </PageContent>
    )
}

export const MinimalLayoutPropTypes = {
    ...PageHeaderPropTypes,
    containerProps: PropTypes.shape(PageContentPropTypes),
    overflow: PageContentPropTypes.overflow,
}

MinimalLayout.propTypes = MinimalLayoutPropTypes

export default MinimalLayout