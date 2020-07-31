import React from 'react'
import Grid from '@material-ui/core/Grid';
import './list.scss'

export default ({items, ListItem, CreateItem = null, Component, listItemProps, createItemProps, ...rest}) => {
    return(
        // TODO: Render buttons to change the layout
        <div className={"list-container"}>
            <Grid container spacing={3}>
                { CreateItem? <Grid item xs={12}>
                    <Component
                    >
                        <CreateItem
                            {...createItemProps}
                        />
                    </Component>
                </Grid> : null }
                {Array.isArray(items) && items.map( (item, index) => (
                    <Grid item xs={12} key={index}>
                        <Component
                        >
                            <ListItem 
                                item={item}
                                {...listItemProps}
                            />
                        </Component>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
