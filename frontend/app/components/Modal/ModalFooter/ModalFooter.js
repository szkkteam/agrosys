import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'; 
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { useModalContext } from '../hooks'

import {
    DialogActions,
    Grid
} from '@material-ui/core';

import SecondaryButton from '../components/SecondaryButton'
import PrimaryButton from '../components/PrimaryButton'


const Footer = styled(DialogActions)`
    ${({ theme }) => `
        //background-color: ${theme.palette.primary.main};
        background-color: lightgray;
        display: flex;
        align-items: center;
    `}    
`

//<FormattedMessage {...title} />
const ModalFooter = ({
    className,
    alignChildren="right",
    children,
    primaryButtonProps,
    secondaryButtonProps,
    ...props
}) => {

    return (
        <Footer
            className={className}
        >
            <Grid container
                justify={alignChildren === "right"? "flex-end" : alignChildren === "left"? "flex-start" : "center"}
            >
                    { children
                        ?   children
                        :   (
                            <div>
                                <SecondaryButton
                                    {...secondaryButtonProps}
                                />
                                <PrimaryButton
                                    {...primaryButtonProps}
                                />
                            </div>
                        )
                    }
            </Grid>
        </Footer>
    )
}


ModalFooter.propTypes = {
    alignChildren: PropTypes.oneOf(['right', 'left', 'center']),
    primaryButtonProps: PropTypes.shape({
        title: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        type: PropTypes.string,
    }),
    secondaryButtonProps: PropTypes.shape({
        title: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        type: PropTypes.string,
    }),
}

export default ModalFooter