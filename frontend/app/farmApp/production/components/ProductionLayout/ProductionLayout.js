import React, { useEffect, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { 
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

const SideTabs = ({
    //location,
}) => {
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
        <Tabs
            value={location.hash || TAB_SUMMARY}
            orientation="vertical"
        >
            { tabs && tabs.map((tab, i) => 
                <TabLink key={i} to={ {...location, hash: tab.value} } value={tab.value} label={tab.title}/>    
            )}
          
        </Tabs>
    )
}


const MasterRouter = ({

}) => {

    return (
        <>
            <HashRoute path={TAB_SUMMARY} component={ProductionTabSummary} />
            <HashRoute path={TAB_TASKS} component={ProductionTabTasks} />
            <HashRoute path={TAB_CROP_VARIANTS} component={ProductionTabCropVariants} />
            <HashRoute path={TAB_FIELDS} component={FieldLayout} />
            <HashRoute path={TAB_PESTS} component={ProductionTabPests} />
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
    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    return (
        <Container>
            <MasterDetail
                masterSize={2}
            >
                <SideTabs 
                    //location={location}
                />
                <MasterRouter />
            </MasterDetail>
        </Container>
    )
}

ProductionLayout.propTypes = {
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default ProductionLayout
