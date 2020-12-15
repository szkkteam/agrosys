import React, { useRef, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'

import { 
    HeaderContentContext,
    MasterDetail,
    Tabs,
    TabButton
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
} from 'farmApp/field/components'

import {
    ProductionHeader,
} from '../../components'
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
// TODO: Any margin will push over the fields than 100% ... but currently cannot keep inside
const TabsGroup = styled(forwardRef((props, ref) => <Tabs {...props} ref={ref} />))`
    /* margin: 15px 0; */
    &:nth-child(1) {
        border-radius: 10px;
        > div {
            > div {
                height: 100%;
            }
        }
    }
`

const SideTabs = forwardRef(({
    //location,
}, ref) => {
    // TODO: Tabs are always re-rendering, because the location is fully changed
    // and this causes the page to render again.

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
        <TabsGroup
            ref={ref}
            value={location.hash || TAB_SUMMARY}
            orientation="horizontal"
            variant="fullWidth"
            centered
            TabIndicatorProps={{
                style: {
                    display: "none",
                }
            }}
        >
            { tabs && tabs.map((tab, i) => 
                <TabButton key={i} to={ {...location, hash: tab.value} } value={tab.value} label={tab.title} />    
            )}
          
        </TabsGroup>
    )
})


const MasterRouter = ({
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

    const containerRef = useRef(null)
    const tabsRef = useRef(null)

    const height = useHeightDifference(containerRef, tabsRef, 778)

    return (
        <Container
            ref={containerRef}
        >
            <SideTabs 
                ref={tabsRef}
                //location={location}
            />
            <MasterRouter
                height={height}
            />
        </Container>
    )
}

ProductionLayout.propTypes = {
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default ProductionLayout
