import React from 'react'
import List from '@material-ui/core/List';


//<React.Fragment key={`${sidebarItem.name}${index}`}>
export default ({ items, depthStep, depth, expanded }) => (
    <List disablePadding dense>
        {items.map((sidebarItem, index) => (
            <React.Fragment key={index}>
                { sidebarItem.type != "divider"?  
                    React.createElement(sidebarItem.src, 
                    {
                        depthStep: depthStep,
                        depth: depth,
                        expanded: expanded
                    }, ...this.props) :
                    React.createElement(sidebarItem.src, 
                        {}, ...this.props)
                }
            </React.Fragment>
        ))}
    </List>
) 


 