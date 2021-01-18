import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { pushModalWindow } from 'redux-promising-modals';
import { bindActionCreators } from 'redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'

import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'
import { usePushModalWindow } from 'utils/hooks'

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
import FieldTabCrop from './FieldTabCrop'

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
/*
const FieldDetailPage = ({
    invalid,
    handleSubmit,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    //onBack,
    onEditBorder,
    currentTitle,

    startDraw=false,
    ...rest 
}) => {
*/
class FieldDetailPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: 0
        }
    }

    componentDidMount() {
        const { startDraw = false } = this.props
        // If component is called within create context
        // FIXME: Modal is rendered twice because something if fucked up with the routers
        if (startDraw)
            this.openFieldDraw()
        
    }

    openFieldDraw = () => {
        const { pushModalWindow } = this.props

        const initialValues = {

        }


        console.debug("Push modal")
        // FIXME: Modal is rendered twice because something if fucked up with the routers
        pushModalWindow(FIELD_DRAW_DIALOG, {initialValues}).then(({payload, status}) => {
            // Production submitted
            if (status === MODAL_TYPE_CONFIRM) {
                //array.push('productions', payload)
            }
            //console.debug("Payload: ", payload)
            //console.debug("Finished: ", status)
        })
    }


    handleTabChange = (e, newValue) => {
        this.setState({
            activeTab: newValue
        })
    }


    getTabComponent = (tab) => {
        switch(tab) {
            case 0:
                return FieldTabGeneral
            case 1: 
                return FieldTabSubsidies
            case 2:
                return FieldTabCrop
            default:
                return null
        }
    }

    render() {

        const { activeTab } = this.state
        const {
            handleSubmit,
            pristine,
            invalid,

            currentTitle,
            intl,
        } = this.props

        const TabComponent = this.getTabComponent(activeTab)

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
                                            onChange={this.handleTabChange}
                                        >
                                            <Tab label={intl.formatMessage(messages.generalTabTitle)} {...tabProps(0)} />
                                            <Tab label={intl.formatMessage(messages.lpisTabTitle)} {...tabProps(1)} />
                                            <Tab label={intl.formatMessage(messages.cropTabTitle)} {...tabProps(2)} />                                        
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
                                        //onCancel={onBack}
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
                                onClick={this.openFieldDraw}
                            >
                                <FormattedMessage {...messages.borderEditButtonTitle}/>
                            </Button>
                        </DescriptionContainer>
                    </Grid>
                </Grid>
            </Container>
        ) 
    }
}


  
  const withConnect = connect(
    null,
    (dispatch) => bindActionCreators({ pushModalWindow }, dispatch),
  )
  
  
export default compose(
    withConnect,
    injectIntl
)(FieldDetailPage)
