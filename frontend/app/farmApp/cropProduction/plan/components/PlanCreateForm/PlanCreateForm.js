import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'
import { usePlanCropDialog } from '../../hooks'

import {
    PageHeader,
    PageContent,
    PageToolbar,
    PrimaryActionButton,
} from 'components'

import {
    FullscreenFormLayout,
    ExpandPanel
} from 'farmApp/components'

import {
    Button,
    Typography,
    IconButton,
    Collapse,

} from '@material-ui/core'

import PlanCropPanelSummary from '../PlanCropPanelSummary/PlanCropPanelSummary'
import PlanCropPanelDetail from '../PlanCropPanelDetail/PlanCropPanelDetail'

const Spacer = styled.div`
    flex-grow: 1;
`

const AddParcelButton = styled(PrimaryActionButton)`
    max-width: 220px;
`

const Flex = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

const Section = styled.div`
    ${Spacing}
`

const CropAccordion = ({
    onDelete,

}) => {
    const [expanded, setExpanded] = useState(true)

    const handleExpanded = () => {
        setExpanded(!expanded)
    }

    return (
        <ExpandPanel        
            expanded={expanded}
            onExpandChange={handleExpanded}
            actionDisable
            summary={(props) => (
                <PlanCropPanelSummary {...props} />)
            }
            actions={
                <>
                    <AddParcelButton 
                        title="Add field"
                        //onClick={this.handleDrawerOpen}
                    />
                    <Spacer />
                    <Button size="small" color="secondary">
                        delete
                    </Button>
                </>
            }
        >
                <div>
                    TODO: Place a stepper here. Also an edit/delete maybe a more button. At the bottom of the detail maybe place a save button?

                </div>
                <PlanCropPanelDetail />                
        </ExpandPanel>
        
    )
}

const PlanCreateForm = ({

}) => {
    const openDialog = usePlanCropDialog()
    const [data, setData] = useState([1,])

    const handleAddCrop = () => {
        openDialog()
        setData(_.concat(data, 1))
    }

    useEffect(() => {
        openDialog()
    }, [])

    const handleDelete = (index) => () => {
        //const copy = [...data]
        setData([ ...data.slice(0, index), //copy the first 2 elements
            ...data.slice(index + 1, data.length) //copy the last 2 elements
          ])
        //setData(copy.splice(index, 1))
    }
    /**
     * Mi lenne akkor ha minden accordion 1 külön form lenne. 
     * Ezt a nézetet fellehetne használni máshol is esetleg, nem form formájában. Kiegészítve az oszlopokat
     * Az accordionon belül lehetne egy stepper, ahol az crop paramétereket majd az country paramétereket és végül a finance paramétereket állítja be az illető
     * 
     */
    return (
        <PageContent spacing={[1, 2]} overflow>
            <PageHeader
                spacing={[3,2]}
                title="Create new season plan"
                subheader="Add crops to your season"
            >                
            </PageHeader>       
            <PageToolbar>
                <Flex>
                    <Typography variant="h6">
                        Season (2019 Szeptember 9 - 2020 Január 10)
                    </Typography>
                    <Spacer />
                    <PrimaryActionButton
                        title="Add crop"
                        onClick={handleAddCrop}
                    /> 
                </Flex>
            </PageToolbar>     
            <Section spacing={2}>
            </Section>
            {data.map((data, i) => (
                <CropAccordion key={i}
                    onDelete={handleDelete(i)}
                    index={i}
                />
            ))}
            
        </PageContent>
    )
}

PlanCreateForm.propTypes = {

}

export default PlanCreateForm