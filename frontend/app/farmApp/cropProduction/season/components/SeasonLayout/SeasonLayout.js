import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { VIEW_MODULE, VIEW_LIST } from '../../constants'

import { 
    TableLayout
} from 'farmApp/components'

import SeasonList from '../SeasonList/SeasonList'

const Placeholder = () => <div>Placeholder Layout</div>

import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ListIcon from '@material-ui/icons/List';

const SeasonLayout = ({

}) => {

   const views = [
        {value: VIEW_LIST, icon: ListIcon, component: SeasonList},
        {value: VIEW_MODULE, icon: ViewModuleIcon, component: Placeholder},
    ]

    return (
        <TableLayout
            title="Seasons - list"
            views={views}
            primaryAction={{
                title: messages.addNewTitle,
            }}
        />        
    )
}

/*
        <div>
        Crop overview. Show quick stats about crops and running productions.<br/>
        Add possibility to create crop, or create production directly under specifc crop or create inline crop for it.<br/>
        Also manage the seasons?<br/>
    </div>
*/

SeasonLayout.propTypes = {

}

export default SeasonLayout
