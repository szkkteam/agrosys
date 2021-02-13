import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { Route } from "react-router-dom";

import { 
    SeasonCreateForm,
} from '../../components'

import {
    SeasonAppBar
} from '../../components'

export default ({
    location,
    ...props
}) => {

    const intl = useIntl()
    const { cropId: userCropId } = useParams()
    console.debug("SeasonCreate-userCropId: ", userCropId)

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <SeasonAppBar
                title={messages.title}
            />
            <SeasonCreateForm
                initialValues={{
                    userCropId,
                    ...location.state?.initialValues ?? {}
                }}
            />
        </>
    )
}
