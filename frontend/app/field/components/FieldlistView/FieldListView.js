import React from 'react'
import Grid from '@material-ui/core/Grid';
import { FieldListElement, FieldListCreate } from '../FieldListElement'
import './fieldlistview.scss'

export default class FieldListView extends React.Component 
{

    render() {

        const { items } = this.props;

        return(
            <div className={"field-container"}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FieldListCreate />
                    </Grid>
                    {items.map( (item, index) => (
                        <Grid item xs={12}>
                            <FieldListElement 
                                item={item}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}