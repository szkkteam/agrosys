import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'

import {
    Grid,
    Typography,
    Chip,
    Button
} from '@material-ui/core';

import { 
    SearchButton,
} from 'components'

import {
    WorkerAddButton,
    WorkerSettingsButton
} from '../../components'

const WorkerContentHeader = forwardRef((props, ref) => {

    const [chipData, setChipData] = useState([
            { key: 0, label: 'Pony Car' },
            { key: 1, label: 'Mustang' },
            { key: 2, label: '1967' },
    ])


    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };

    return (
        <Grid 
            ref={ref}
            container
            alignItems="center"
            spacing={1}
        >
        <Grid item xs={8}>
            <WorkerAddButton />
        </Grid>
        <Grid item xs={4}>
            <div style={{float: "right"}}>
                <WorkerSettingsButton />
                <WorkerSettingsButton />
            </div>
        </Grid>
        <Grid item xs={10}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "15px 0",
                }}
            >
                <Typography variant="body2">
                    Active filters:
                </Typography>
                <ul 
                    style={{
                        paddingLeft: "10px",
                        margin: "0px",
                        display: "flex",
                        flexWrap: 'wrap',
                        listStyle: 'none'
                    }}
                >
                    { chipData.map((chip) => {
                        return (
                            <li 
                                key={chip.key}
                                style={{
                                    margin: "0 7px",
                                }}
                            >
                                <Chip
                                    label={chip.label}  
                                    onDelete={handleDelete(chip)}                              
                                />
                            </li>
                        )
                    }) }
                </ul>
                <Button
                    style={{
                        textTransform: "initial"
                    }}
                    color="primary"
                >
                    clear all
                </Button>
            </div>            
        </Grid>
        <Grid item xs={2}>
            <SearchButton style={{float: "right"}}/>
        </Grid>
    </Grid>
    )
})

WorkerContentHeader.propTypes = {

}

export default WorkerContentHeader