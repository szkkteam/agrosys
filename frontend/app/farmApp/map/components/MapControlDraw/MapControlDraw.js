import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
    Button
} from '@material-ui/core'

import {
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction
} from '@material-ui/lab'

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';


const Container = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 20px;
    right: 20px;
    //transform: translateY(-50%);
`

const DialContainer = styled.div`
    height: 380px;
    transform: translateZ(0px);
    flex-grow: 1;    
`

const Dial = styled(SpeedDial)`
    position: absolute;
    bottom: 0px;
    right: 0px;
`

const actions = [
    { icon: <FileCopyIcon />, name: 'Draw new shape' },
    { icon: <SaveIcon />, name: 'Delete shape' },
    { icon: <PrintIcon />, name: 'Select' },
];

const MapControlDraw = ({

}) => {

    const [open, setOpen] = useState(false)
 
    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Container>
            <DialContainer>
                <Dial
                    ariaLabel="SpeedDial openIcon example"
                    icon={ 
                        <SpeedDialIcon
                            openIcon={
                                <EditIcon />
                            }
                        />
                    }
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                    ))}
                </Dial>
            </DialContainer>
        </Container>
    )
}

MapControlDraw.propTypes = {

}

export default MapControlDraw