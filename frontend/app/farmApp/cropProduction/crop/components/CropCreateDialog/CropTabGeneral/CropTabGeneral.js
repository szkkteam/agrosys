import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import AddCircleIcon from '@material-ui/icons/AddCircle';

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

import { useFetchCropTypes } from '../../../hooks'

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

const CropTabGeneral = ({
    title,

}) => {

    const intl = useIntl()

    const {payload: cropTypes, isLoading } = useFetchCropTypes()

    return (
            <Container container spacing={1} >
                <Grid container direction="column" item xs={12}>
                    <Media
                        width={200}
                        height={120}
                        image="https://via.placeholder.com/200x120"
                    />
                    <TextHolder>
                        <Typography variant="body1" component="p">
                            <FormattedMessage {...messages.description1} />
                        </Typography>
                        <br/>
                        
                        
                    </TextHolder>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                        <SearchSelectField name="cropType"
                            label={intl.formatMessage(messages.cropType)}
                            loading={isLoading}
                            variant="outlined"
                            formProps={{fullWidth: true}}
                            options={cropTypes}
                            idAccessor={(o) => o.id}
                            groupBy={(option) => option.category}
                            getOptionLabel={(option) => option.title}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="title"
                            label={intl.formatMessage(messages.cropTitle)}
                            variant="outlined"
                            formProps={{fullWidth: true}}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                    <SubTextHolder>
                        <FormattedMessage {...messages.description2} 
                            value={{
                                a: chunks => <a color="primary">{chunks}</a>
                                    //<LinkButton color="primary">{chunks}</LinkButton>                                    
                                
                            }}
                        >
                            {chunks => <Typography variant="caption" component="p">{chunks}</Typography>}
                        </FormattedMessage>
                    </SubTextHolder>
                </Grid>
            </Container>
    )
}
/* TODO: Post request as array, not supported.
                    <Grid item xs={1}>
                        <IconButton>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
*/

CropTabGeneral.propTypes = {

}

export default CropTabGeneral