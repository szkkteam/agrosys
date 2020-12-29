import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
import { ROUTES } from 'routes'

import {
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'

const InlineText = styled(Typography)`
    display: inline;
`

const CropProductionItem = ({

}) => {
    return (
        <ListItem
            button
        >
            <ListItemText
                primary="Wheat production, 5ha"
                secondary={
                    <InlineText
                        component="span"
                        variant="body2"

                    >
                        (2019 September 6 - 2020 december 20)
                    </InlineText>
                }
            />

        </ListItem>
    )
}

CropProductionItem.propTypes = {

}

export default CropProductionItem