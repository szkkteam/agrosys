import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { HeaderContent, MasterDetail } from 'components'
import {
    ProductionTabCropVariants,
    ProductionTabFields,
    ProductionTabPests,
    ProductionTabSummary,
    ProductionTabTasks
} from '../ProductionTabs'
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


/**
 * 1) Header should contain some quick information and statistics (with links or dropdowns)
 * 1.1) Header can also contain the diffent views? (Or put them on the direct page) 
 * 2) Content should be a master detail list
 * 2.1) Master should be a list of available tabs
 * 2.2) Detail should be the actual selected tab
 */


const tabProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const ProductionLayout = ({
    history,
    match,
    ...props
}) => {
    const intl = useIntl()
    const query = useQuery()


    const tabLookup = useMemo(() => [
        { id: TAB_SUMMARY, Component: ProductionTabSummary, Title: (props) => <Tab label={intl.formatMessage(messages.tabSummaryTitle)} {...props} /> },
        { id: TAB_TASKS, Component: ProductionTabTasks, Title: (props) => <Tab label={intl.formatMessage(messages.tabTasksTitle)} {...props} /> },
        { id: TAB_CROP_VARIANTS, Component: ProductionTabCropVariants, Title: (props) => <Tab label={intl.formatMessage(messages.tabCropVariantTitle)} {...props} /> },
        { id: TAB_FIELDS, Component: ProductionTabFields, Title: (props) => <Tab label={intl.formatMessage(messages.tabFieldsTitle)} {...props} /> },
        { id: TAB_PESTS, Component: ProductionTabPests, Title: (props) => <Tab label={intl.formatMessage(messages.tabPestsTitle)} {...props} /> },
    ])

    const currentTab = () => _.findIndex(tabLookup, {id: query.get('tab') || TAB_SUMMARY})

    useEffect(() => {
        switch(query.get('tab')) {
            case TAB_TASKS:
            case TAB_SUMMARY:
            case TAB_CROP_VARIANTS:
            case TAB_FIELDS:
            case TAB_PESTS:
                break 
            default: 
                // TODO: Get the prefered view from storage/redux and apply
                history.replace(`${match.url}?tab=${TAB_SUMMARY}`)
        }
    }, [query])


    const handleTabChange = (e, newValue) => {
        const { id } = tabLookup[newValue]
        history.push(`${match.url}?tab=${id}`)
    }

    return (
        <HeaderContent>
            <ProductionHeader
                id={match.params.id}
            />
            <MasterDetail 
                masterSize={2}
            >
                <Tabs
                    orientation="vertical"
                    //variant="scrollable"
                    value={currentTab()}
                    onChange={handleTabChange}
                >
                    { tabLookup.map((tab, i) => 
                        tab.Title({key: `tab-index-${i}`, ...tabProps(i)})
                    ) }
                </Tabs>
                <Route render={props => {
                    const { Component } = tabLookup[currentTab()]  
                    return (
                        <Component
                            location={location}
                            history={history}
                            match={match}
                            {...props}
                        />
                        )
                    }}
                />
            </MasterDetail>
        </HeaderContent>
    )
}

ProductionLayout.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default ProductionLayout
