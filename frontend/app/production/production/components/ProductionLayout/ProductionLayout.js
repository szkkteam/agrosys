import React, { useRef, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'

import { 
    HeaderContent,
    HeaderContentContext,
    MasterDetail,
    Tabs,
    TabLink
} from 'components'

import {
    ProductionTabCropVariants,
    ProductionTabFields,
    ProductionTabPests,
    ProductionTabSummary,
    ProductionTabTasks
} from '../ProductionTabs'

import {
    FieldLayout
} from 'resource/field/components'

import { useQuery } from 'utils/hooks'

import { 
    TAB_TASKS,
    TAB_SUMMARY, 
    TAB_CROP_VARIANTS,
    TAB_FIELDS,
    TAB_PESTS
} from '../../constants'


const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

const ProductionRoutes = ({
    height
}) => {

    return (
        <>
            <HashRoute path={TAB_SUMMARY} component={props => <ProductionTabSummary height={height} {...props} />} />
            <HashRoute path={TAB_TASKS} component={props => <ProductionTabTasks height={height} {...props} />} />
            <HashRoute path={TAB_CROP_VARIANTS} component={props => <ProductionTabCropVariants height={height} {...props} />} />
            <HashRoute path={TAB_FIELDS} component={props => <FieldLayout height={height} {...props} />} />
            <HashRoute path={TAB_PESTS} component={props => <ProductionTabPests height={height} {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: TAB_SUMMARY}} />} />
        </>
    )
}

const ProductionLayout = ({
    //history,
    //match,
    //location,
    ...props
}) => {
    const intl = useIntl()
    const location = useLocation()

    const tabs = [
        {value: TAB_SUMMARY, title: intl.formatMessage(messages.tabSummaryTitle)},
        {value: TAB_TASKS, title: intl.formatMessage(messages.tabTasksTitle)},
        {value: TAB_CROP_VARIANTS, title: intl.formatMessage(messages.tabCropVariantTitle)},
        {value: TAB_FIELDS, title: intl.formatMessage(messages.tabFieldsTitle)},
        {value: TAB_PESTS, title: intl.formatMessage(messages.tabPestsTitle)},
    ]


    return (
        <HeaderContent
        >
            <StyledTabs
                value={location.hash || TAB_SUMMARY}
                orientation="horizontal"
            >
                { tabs && tabs.map((tab, i) => 
                    <TabLink key={i} to={ {...location, hash: tab.value} } value={tab.value} label={tab.title} />    
                )}            
            </StyledTabs>
            <ProductionRoutes
            />
        </HeaderContent>
    )
}

ProductionLayout.propTypes = {
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default ProductionLayout
