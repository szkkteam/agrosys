import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router-dom";
import messages from './messages';
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import * as modalResultTypes from 'site/modalResultTypes';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Field, reduxForm, formValueSelector } from 'redux-form'


import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'
import { LeafletMap } from 'farmApp/map/components'
import BlockEditTabGeneral from './BlockEditTabGeneral'
import BlockEditTabLPIS from './BlockEditTabLPIS'

import { BLOCK_CREATE_FORM } from '../../constants'

import './blockdrawpage.scss'
import './blockeditpage.scss'

const tabProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const BlockDrawPage = ({
    invalid,
    handleSubmit,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    onBack,
    onComplete,
    currentTitle,
    ...rest 
}) => {

    const intl = useIntl()

    let history = useHistory()

    const onCancel = () => {
        console.log("Go back")
        history.goBack()
    }

    //{intl.formatMessage(messages.farmDashboardTitle)}
    console.log("OnBack: ", onBack)

    /**
     * 1) Put a title which shows a placeholder (based on country) and the area (optional)
     * 2) Put a leaflet map, which shows statically the polygon + area somewhere
     * 3) Put a section
     * 4) Inside the section, define the form
     */

    const [activeTab, activateTab] = useState(0)

    const handleTabChange = (e, newValue) => {
        activateTab(newValue)
    }

    const getTabComponent = (tab) => {
        switch(tab) {
            case 0:
                return BlockEditTabGeneral
            case 1: 
                return BlockEditTabLPIS
            default:
                return null
        }
    }

    const TabComponent = getTabComponent(activeTab)
    console.log("formatMessage: ", messages.generalTabTitle)

    return (      
        <Grid
            className="block-edit"
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <Grid
                    container
                >
                    <Grid item xs={12}>
                        <Typography
                            className="edit-title"
                            variant="h4"
                        >
                            { currentTitle ? currentTitle : "Block name" }, 4 ha
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <LeafletMap
                            className="map-container"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div className="edit-description">
                            <Typography variant="h6">
                                <FormattedMessage {...messages.borderEditTitle}/>
                            </Typography>
                            <Typography variant="body2">
                                <FormattedMessage {...messages.borderEditDesc}/>
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onBack}
                            >
                                <FormattedMessage {...messages.borderEditButtonTitle}/>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit} >  
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid item xs={2}>
                            <div style={{flexGrow: 1, display: 'flex'}}>
                                <Tabs
                                    orientation="vertical"
                                    //variant="scrollable"
                                    value={activeTab}
                                    onChange={handleTabChange}
                                >
                                    <Tab label={intl.formatMessage(messages.generalTabTitle)} {...tabProps(0)} />
                                    <Tab label={intl.formatMessage(messages.lpisTabTitle)} {...tabProps(1)} />
                                </Tabs>
                            </div>
                        </Grid>                        
                        <Grid item xs={10}>
                            <TabComponent />
                        </Grid>          
                        <Grid item xs={12}>
                            <div className="step-control">
                            <SubmitButton
                                className="navigation-buttons"
                                cancelTitle={ButtonMessages.back}
                                submitTitle={ButtonMessages.submit}
                                //cancelDisabled={true}
                                submitDisabled={pristine || invalid}
                                //onSubmit={onSubmit}
                                onCancel={onBack}
                            />  
                            </div>
                        </Grid>          
                    </Grid>
                </form>                    
            </Grid>
        </Grid>
    ) 
}


const withForm = reduxForm({
    form: BLOCK_CREATE_FORM,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return {        
            initialValues: {
                ...locinitialValues
            },
            ...rest
        }
    },
)


const selector = formValueSelector(BLOCK_CREATE_FORM)
const withSelectBlockTitle = connect(
    (state, props) => {
        const currentTitle = selector(state, 'title')
        return {
            currentTitle
        }
    }
)


export default compose(
    withConnect,
    withForm,
    withSelectBlockTitle,
)(BlockDrawPage) 

