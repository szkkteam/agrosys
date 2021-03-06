import React, { useState, useMemo, useLayoutEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    Modal,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalContext,
    PageHeader,
} from 'components'

import {
    SeasonSelector
} from 'farmApp/components'

import {    
    Grid,
    CardMedia,
    Typography
} from '@material-ui/core'

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
    margin-top: 50px;
    margin-bottom: 70px;
    max-width: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Content = ({
    children
}) => {


    return (
        <Grid container alignItems="flex-start" justify="center" style={{flexGrow: 1}}>
            <Grid item >
                <Container>
                    <Media
                        width={200}
                        height={120}
                        image="https://via.placeholder.com/200x120"
                    />
                    <Text>
                        <Typography variant="h6">
                            Select your season in which you want to grow crops
                        </Typography>
                    </Text>
                    <div style={{width: "220px"}}>
                        {children}
                    </div>

                    
                </Container>
            </Grid>
            
        </Grid>
        
    )
}

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
        <Modal
            fullWidth
            maxWidth="sm"
        >   
            <ModalHeader
                title={messages.title}
            />
            <ModalContent>
                <Content>
                    <SeasonSelector
                        label="Season"
                        value={season}
                        onChange={handleChangeSeason}
                        seasons={[
                            2019, 2020, 2021
                        ]}

                    />
                </Content>
            </ModalContent>
            <ModalFooter
                primaryButtonProps={{
                    title: globalMessages.select,
                    disabled: season === "",
                    onClick: handleSelect
                }}
                
            />
        </Modal>
    )
}

FieldPlanSeasonSelectDialog.propTypes = {

}

export default FieldPlanSeasonSelectDialog