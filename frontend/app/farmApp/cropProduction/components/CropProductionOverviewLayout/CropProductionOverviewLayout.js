import React, { useState } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'
import { useFetchFields } from 'farmApp/resource/field/hooks'

import { 
    PrimaryActionButton,
} from 'components'

import {
    Button,
    Grid
} from '@material-ui/core'

import { 
    DashboardLayout
} from 'farmApp/components'

import CropSummary from '../CropProductionCropSummary/CropProductionCropSummary'
import CropDetail from '../CropProductionCropDetail/CropProductionCropDetail'
import CropTabs from '../CropProductionCropFieldTabs/CropProductionCropFieldTabs'
import SeasonPanel from '../CropProductionSeasonPanel/CropProductionSeasonPanel'
import Toolbar from '../CropProductionFeatureToolbar/CropProductionFeatureToolbar'

const LinkButton = withLinkComponent(PrimaryActionButton)

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const Crop = ({
    ...props
}) => {
    return (
        <SeasonPanel.Panel
            summary={
                <CropSummary
                    title="Őszi búza"
                    dates={{
                        start: new Date(2020, 9, 1),
                        end: new Date(2021, 1, 19)
                    }}
                    measures={{
                        area: 35.7*10000,
                        yield: 12*1000,
                        income: 32000,
                        expenses: 16000,
                    }}
                />
            }
            actions={
                <>
                    <Button color="secondary">
                        delete
                    </Button>
                    <Spacer/>
                    <Button color="primary">
                        show more
                    </Button>
                </>

            }
            {...props}
        >
            <CropDetail>
                <CropDetail.Field
                />

            </CropDetail>
            
        </SeasonPanel.Panel>
    )
}
/*
<CropTabs
                tabs={['Fields', 'Tasks', 'Weather']}
            >
                <CropFields />
                <CropFields />
                <CropFields />
            </CropTabs>            
*/

const Season = ({
    className,
    ...props
}) => {
    return (
        <SeasonPanel className={className}>
            <Crop />
            <Crop />
        </SeasonPanel>
    )
}

const SeasonCard = styled(Season)`
    margin: 8px;
`

const RightButton = styled(Button)`
    margin-left: auto;
    margin-right: 8px;
`


const CropProductionOverviewLayout = ({    
    ...props
}) => {

    const { payload, isLoading } = useFetchFields()
    const [seasons, setSeasons] = useState([1])

    const handleLoadMore = () => {
        setSeasons(_.concat(seasons, [1]))
    }
    return (
        <DashboardLayout
            headerProps={{
                title: "Your crop production by seasons"
            }}
            toolbar={
                <Toolbar>
                    <Grid container item xs={12} md={2} >
                        <Spacer />
                        <LinkButton
                            style={{marginLeft: "auto", marginRight: "10px"}}                            
                            title={messages.addSeasonTitle}
                            to={ROUTES.CropProductionCreate}
                        />
                    </Grid>
                </Toolbar>
            }
        >
            <Flex>
                {seasons.map((season, i) => (
                    <SeasonCard key={i} />
                ))}
                <RightButton 
                    onClick={handleLoadMore}
                    color="primary"
                >
                    load more
                </RightButton>
            </Flex>
        </DashboardLayout>
    )
}

CropProductionOverviewLayout.propTypes = {

}

export default CropProductionOverviewLayout
