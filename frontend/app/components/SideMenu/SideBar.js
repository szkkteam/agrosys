import React from 'react'
import List from '@material-ui/core/List';


//<React.Fragment key={`${sidebarItem.name}${index}`}>
export default ({ items, depthStep, depth, expanded }) => (
    <List disablePadding dense>
        {items.map((sidebarItem, index) => (
            <React.Fragment key={index}>
                {React.createElement(sidebarItem, 
                    {
                        depthStep: depthStep,
                        depth: depth,
                        expanded: expanded
                    }, ...this.props)}
            </React.Fragment>
        ))}
    </List>
) 


 