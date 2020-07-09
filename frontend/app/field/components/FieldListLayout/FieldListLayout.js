import React from 'react'
import Grid from '@material-ui/core/Grid';
import './fieldlistlayout.scss'

import FieldListItemCard from '../FieldListItemCard'
import FieldListItemList from '../FieldListItemList' 
import { FieldListCreate, FieldListElement } from 'field/components'  

const FIELD_VIEW_TYPES = {
    LIST_VIEW: {
        Component: FieldListItemList,
    },
    CARD_VIEW: {
        Component: FieldListItemCard,
    } 
}


export default class FieldListLayout extends React.Component 
{
    /* TODO: This component is responsible to change the layout based on the layout change buttons.
       The componenet should be dumb, just forwarding the data to the corresponding data holder componenets
     */
    constructor(props) {
        super(props)
 
        this.state = {
            displayView : FIELD_VIEW_TYPES.LIST_VIEW,
        }
    }

    setListView = () => {
        this.setState({ displayView: FIELD_VIEW_TYPES.LIST_VIEW })
    }

    setCardView = () => {
        this.setState({ displayView: FIELD_VIEW_TYPES.CARD_VIEW })
    }

    render() {

        const { items } = this.props;
        const { Component } = this.state.displayView
        return(
            // TODO: Render buttons to change the layout
            <div className={"field-container"}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Component
                        >
                            <FieldListCreate />
                        </Component>
                    </Grid>
                    {Array.isArray(items) && items.map( (item, index) => (
                        <Grid item xs={12}>
                            <Component
                            >
                                <FieldListElement 
                                    item={item}
                                />
                            </Component>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}
