import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { FullscreenFormLayout } from 'farmApp/components'

import {
    Grid
} from '@material-ui/core';


import { PrimaryButton, SecondaryButton } from 'components'

const ColumnContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
`

const ColumnFooter = styled.div`
    width: 100%;
    margin: auto;
    flex: 0 0 92px;
    display: flex;
    align-items: center;
`

const ColumnContent = styled.div`
    width: 100%;
    margin: auto;
    flex: 1;
`

const FieldDetailLayout = ({
    title,
    subheader,
    master,
    primaryButtonProps,
    secondaryButtonProps,
    alignFooter="right",
    children,
}) => {


    return (      
        <FullscreenFormLayout
            headerProps={{
                title,
                subheader
            }}
        >

            <ColumnContainer>
                           
                <ColumnContent>
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        //spacing={1}
                    >
                        <Grid container item xs>
                            {children}
                        </Grid>
                    </Grid>
                </ColumnContent>
                <ColumnFooter>
                    <Grid container justify={alignFooter === "right"? "flex-end" : alignFooter === "left"? "flex-start" : "center"} >
                        <div>
                            <SecondaryButton {...secondaryButtonProps} />
                            <PrimaryButton {...primaryButtonProps} />
                        </div>
                    </Grid>
                </ColumnFooter>                                
            </ColumnContainer>            
        </FullscreenFormLayout>
    ) 
}
/*
  
*/

FieldDetailLayout.propTypes = {
    primaryButtonProps: PropTypes.shape({
        title: PropTypes.object
    }),
    secondaryButtonProps: PropTypes.shape({
        title: PropTypes.object
    })
}

export default FieldDetailLayout