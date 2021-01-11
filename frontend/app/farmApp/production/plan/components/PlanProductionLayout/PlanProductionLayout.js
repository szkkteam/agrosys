import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    Stepper
} from 'components'

import GridTable from 'farmApp/components/GridTable'

import {
    FieldListItem
} from 'farmApp/production/field/components'

import {
    PlanMainCropVariantTab,
    PlanMainCropSubsidiesTab
} from '../../components'

import {
    Grid,
    Tabs,
    Tab,
    Button,
} from '@material-ui/core'


const variants = [
    {id: 1, title: "ABONY", },
    {id: 2, title: "ACTIVUS", },
]

const AddParcelButton = ({

}) => {
    return (
        <Button
            color="primary"
            variant="contained"
            style={{width: "15%", marginTop: "10px"}}
        >
            Add parcel
        </Button>
    )
}

const MainCrop = ({

}) => {
    const [activeTab, setActiveTab] = useState(0)

    const data = [
        { id: 1, variant: 'variant 1', plannedYield: 7 },
        { id: 1, variant: 'variant 1', plannedYield: 7 },
        { id: 1, variant: 'variant 1', plannedYield: 7 },
        { id: 1, variant: 'variant 1', plannedYield: 7 },
        { id: 1, variant: 'variant 1', plannedYield: 7 }
    ]

    const handleTabChange = (e, value) => {
        setActiveTab(value)
    }
    return (
        <div>
            <div>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                >
                    <Tab value={0} label="Crop and variants" />
                    <Tab value={1} label="Subsidies" />
                </Tabs>
            </div>            
            { activeTab === 0
                ?   <PlanMainCropVariantTab
                        data={data}
                    >
                        <AddParcelButton />
                    </PlanMainCropVariantTab>
                :   <PlanMainCropSubsidiesTab
                        data={data}
                    >
                        <AddParcelButton />
                    </PlanMainCropSubsidiesTab>
             }
          
        </div>
    )
}

const steps = [
    messages.step1,
    messages.step2,
]

const contents = [
    (props) => <MainCrop {...props} />,
    (props) => <MainCrop {...props} />,
]

const PlanProductionLayout = ({

}) => {
   
    return (
        <Stepper
            steps={steps}
            contents={contents}
            orientation="vertical"
        />
    )
}
/**

            Tábla sorszámot adjuk hozzá.
            A felső táblának legyen neve , hogy "Főtermény"
            majd legyen egy gomb alul, hogy másodvetés hozzáadása, vagy egy dropdown a header résznél, hogy másodvetés
            A másodvetés hasonló módon legyen, mint a fővetés rész, ezeket lehetne egy collapsba is foglalni.
            Ez season groupot fog csinálni, amely 2 atomic seasonből áll. A group lesz a fő season, míg az atomic lesz: főtermény + másodvetés<br/>
            <br/>
            Fővetés:<br/>
            Szaporítóanyag típusai (Több is lehet)<br/>
            <br/>
            Másodvetés:<br/>            
            A következő mezők kellenek táblánként:<br/>
            Termény fajok (crop type) (Több is lehet)<br/>
            Termény fajták (variant) (Több is lehet)<br/>
            Crop codes (Több is lehet)<br/>
            Szaporítóanyag típusai (Több is lehet)<br/>
            Másodvetés típusa: Ökológiai jelentőségű másodvetés/Hagyományos/....<br/>

 */

PlanProductionLayout.propTypes = {

}

export default PlanProductionLayout