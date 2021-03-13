import React, { useState, useMemo, useLayoutEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import ModalContext from 'components/Dialog/Context'

import { 
    Dialog,
    Button,
} from 'components'

import {
    SeasonSelector
} from 'farmApp/components'

import {    
    Grid,
    CardMedia,
    Typography,
    Link as MuiLink
} from '@material-ui/core'

const Link = withLinkComponent(MuiLink)

const Media = styled(({width, height, ...props}) => <CardMedia {...props} />)`
    ${({theme, width, height}) => `
        margin: 0 auto;
        width: ${width}px;
        height: ${height}px;
    `}
`

const Text = styled.div`
    margin-top: 15px;
    margin-bottom: 30px;
`

const Container = styled.div`
    ${spacing}
    width: 100%;
`

const AlignedSeasonSelector = styled(props => <SeasonSelector {...props} />)`
    margin: 0 auto;
`


const SubmitButton = styled(Button)`
    ${spacing}
    width: 100%;
`

const FieldPlanSeasonSelectDialog = ({
    headerProps,
    ...props
}) => {
    const [season, setSeason] = useState("")
    const { handleConfirm } = useContext(ModalContext)

    const handleSelect = () => {
        handleConfirm && handleConfirm({season})
    }

    const handleChangeSeason = (e) => {
        setSeason(e.target.value)
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
        >   
            <Dialog.SimpleHeader
                title={messages.title}
                subheader={{
                    ...messages.subheader,
                    values: {
                        a: chunks => (
                            <Link to={ROUTES.PlanCropPlan}>
                                {chunks}
                            </Link>
                        )
                    }
                }}
            >
                <Dialog.CloseButton />
            </Dialog.SimpleHeader>
            <Dialog.Content
                dividers
            >
                <Container
                    my={3}
                >
                    <AlignedSeasonSelector
                        label="Season"
                        value={season}
                        onChange={handleChangeSeason}
                        seasons={[
                            2019, 2020, 2021
                        ]}

                    />
                </Container>
            </Dialog.Content>
            <Dialog.Footer
                py={3}
                px={2}
            >
                <SubmitButton 
                    color="primary"
                    variant="contained"
                    title={globalMessages.select}
                    disabled={season === ""}
                    onClick={handleSelect}
                />
            </Dialog.Footer>
        </Dialog>
    )
}

FieldPlanSeasonSelectDialog.propTypes = {

}

export default FieldPlanSeasonSelectDialog