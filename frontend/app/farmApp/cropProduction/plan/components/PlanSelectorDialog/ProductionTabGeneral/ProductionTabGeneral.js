import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { PlanSelector } from 'farmApp/cropProduction/plan/components'
import { PrimaryActionButton } from 'components'

import { 
    HiddenField,
    TextField,
    SearchSelectField,
} from 'components/Form'

import {
    Typography,
    Grid,
    CardMedia,
    Button,
    IconButton
} from '@material-ui/core'

const Divider = styled.div`
    margin: 15px 0;
    width: 100%;
    border-bottom: 2px solid black;
`

const Media = styled(({width, height, ...props}) => <CardMedia {...props} />)`
    ${({theme, width, height}) => `
        margin: 0 auto;
        width: ${width}px;
        height: ${height}px;
    `}
`

const TextHolder = styled.div`
    padding: 25px 0;
    padding-bottom: 50px;
    text-align: center;
`

const SubTextHolder = styled.div`
    text-align: right;
    margin-right: 15px;
    margin-bottom: 25px;
`

const Container = styled(Grid)`
    margin-bottom: 60px;
`

const InnerContainer = styled(Grid)`
    margin: 20px 0;
`

const AddButton = styled(props => <PrimaryActionButton {...props} />)`
    margin: a auto;
    width: 100%;
`

const ProductionTabGeneral = ({
    title,
    onCreate,
}) => {

    const intl = useIntl()

    const handleClick = () => {
        onCreate && onCreate({})
    }

    return (
            <Container container spacing={1} >
                <InnerContainer container direction="column" item xs={12} justify="center" alignItems="center">
                    <Grid container direction="row" item xs={12} sm={8} md={6} justify="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <Typography variant="body1" component="p">
                                <FormattedMessage {...messages.description1} />
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <PlanSelector 
                                /*
                                noOptionButton={{
                                    title: messages.addNewPlan,
                                    onClick: (e) => null,
                                }}
                                */
                            />
                        </Grid>
                        <Grid item>
                        <Typography variant="body1" component="p">
                                <FormattedMessage {...messages.description2} />
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <AddButton
                                type="submit"
                                title={messages.addNewPlan}
                                onClick={handleClick}
                            />  
                        </Grid>
                    </Grid>
                </InnerContainer>
                <Divider />
                <Grid item xs={12}>
                    
                    
                </Grid>
            </Container>
    )
}

ProductionTabGeneral.propTypes = {

}

export default ProductionTabGeneral