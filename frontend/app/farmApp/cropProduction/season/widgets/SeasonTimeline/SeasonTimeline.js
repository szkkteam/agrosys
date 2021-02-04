import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import { useSeasonCreateDialog } from '../../hooks'

import {
    Card,
    CardFab,
    CardHeader,
    CardInfo
} from 'farmApp/components/Card'

import {
    Paper,
    Button,
} from '@material-ui/core'

import {
    Timeline,
} from '@material-ui/lab';

import { SEASON_STATUS } from '../../constants'

import {
    AddSeasonItem,
    SeasonItem
} from './TimelineItems'

const FullHeightPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    height: 100%;
    //overflow-y: auto;
    padding: 10px 5px;
`

//const ScrollContent = styled()

const PaddingTimeline = styled(Timeline)`
    padding: 6px;
`

const LinkButton = withLinkComponent(Button)

const SeasonTimeline = ({

}) => {
    const intl = useIntl()
    const params = useParams()


    const data = [
        {startDate: new Date('2021/03/01'), title: "Wheat 2021", status: SEASON_STATUS.PLANNED},
        {startDate: new Date('2020/03/01'), title: "Wheat 2020", status: SEASON_STATUS.IN_PROGRESS},
        {startDate: new Date('2019/05/01'), title: "Wheat 2019 long long long text", status: SEASON_STATUS.FINISHED},
        {startDate: new Date('2019/01/01'), title: "W19", status: SEASON_STATUS.FINISHED},
        {startDate: new Date('2018/03/01'), title: "Wheat 18", status: SEASON_STATUS.FINISHED},
    ]

    const create = useSeasonCreateDialog()

    const handleCreate = () => {
        create()
    }

    return (
        <Card>
            <CardHeader
                title="Seasons"
                action={<CardInfo title={messages.tooltip}/>}
            >
                <CardFab
                    onClick={handleCreate}
                />
            </CardHeader>
            <div style={{flexGrow: 1, overflowY: "auto"}}>
                <PaddingTimeline align="left">
                        {data.map((d, i) => (
                            <SeasonItem key={i}
                            {...d}
                            isLast={i === data.length - 1} 

                        />
                        ))}
                </PaddingTimeline>
            </div>            
            <LinkButton
                to={ROUTES.CropProductionSeasonView}
                params={params}
            >
                show more
            </LinkButton>
        </Card>
    )
}
//                     <AddSeasonItem />

SeasonTimeline.propTypes = {

}

export default SeasonTimeline