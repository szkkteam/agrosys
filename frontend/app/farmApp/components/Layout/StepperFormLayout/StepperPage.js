import React, { useState, useMemo, useRef, useCallback } from 'react'
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { 
    PageHeader,
} from 'components'

import {
    Grid
} from '@material-ui/core'

import FormFooter from './FormFooter'

const StepperPage = ({
    title,
    subheader,
    children,
    footerProps,
    ...props
}) => {
  
    return (
        <>          
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        title={title}
                        subheader={subheader}
                    />
                    
                </Grid>
                {React.cloneElement(children, props)}
            </Grid>
            <FormFooter
                {...footerProps}
            />
        </>     
    )
}

StepperPage.propTypes = {

}

export default StepperPage