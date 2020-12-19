import React, { useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
    Grid
} from '@material-ui/core';

import { messages as ButtonMessages } from 'components/Button'
import { FieldFormStepButton } from '../../components'
import { LeafletMap } from 'components/Map/components'

import FieldTabGeneral from './FieldTabGeneral'
import FieldTabSubsidies from './FieldTabSubsidies'

const MapSnapshot = styled(LeafletMap)`
    width: 100%;
    height: 300px;
`

const Container = styled(Grid)`
    padding: 15px;
`

const Title = styled(Typography)`
    margin-bottom: 10px;
`

const DescriptionContainer = styled.div`
    margin: 0px 25px;
    h6 {
        margin-bottom: 15px;
    }
    button {
        margin-top: 25px;
    }
`

const tabProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const FieldDetailPage = ({
    invalid,
    handleSubmit,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    onBack,
    onEditBorder,
    onComplete,
    currentTitle,
    ...rest 
}) => {

    const intl = useIntl()

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
                return FieldTabGeneral
            case 1: 
                return FieldTabSubsidies
            default:
                return null
        }
    }

    const TabComponent = getTabComponent(activeTab)

    return (      
        <Container
            container
            spacing={0}
        >
            <Grid item xs={8}>
                <Grid item xs={12}>
                    <Title
                        variant="h4"
                    >
                        { currentTitle ? currentTitle : "Block name" }, 4 ha
                    </Title>
                </Grid>
                <Grid item xs={11} style={{marginTop: "40px"}}>
                    <form onSubmit={handleSubmit} >  
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid item xs={3}>
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
                            <Grid item xs={9}>
                                <TabComponent />
                            </Grid>          
                            <Grid item xs={12}>
                                <FieldFormStepButton
                                    cancelTitle={ButtonMessages.back}
                                    submitTitle={ButtonMessages.submit}
                                    //cancelDisabled={true}
                                    submitDisabled={pristine || invalid}
                                    //onSubmit={onSubmit}
                                    onCancel={onBack}
                                />  
                            </Grid>          
                        </Grid>
                    </form>   
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid item xs={12}>
                    <MapSnapshot
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    <DescriptionContainer>
                        <Typography variant="h6">
                            <FormattedMessage {...messages.borderEditTitle}/>
                        </Typography>
                        <Typography variant="body2">
                            <FormattedMessage {...messages.borderEditDesc}/>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onEditBorder ?? onBack}
                        >
                            <FormattedMessage {...messages.borderEditButtonTitle}/>
                        </Button>
                    </DescriptionContainer>
                </Grid>
            </Grid>
        </Container>
    ) 
}

FieldDetailPage.propTypes = {

}

export default FieldDetailPage