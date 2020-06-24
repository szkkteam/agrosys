import React from 'react'
import classnames from 'classnames'
import clsx from 'clsx';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Icon } from 'leaflet';

import { NavLink } from 'components'

//{Icon && <Icon className="drawer-item-icon" fontSize="default" />}

export default class SideBarItem extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        collapsed: true,
      }
    }
    static defaultProps = {
        depthStep: 10,
        depth: 0,
    }

    handleToggleCollapse = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    onClick = (e) => {
        const { items, onClick: onClickProp } = this.props.item;
        if(Array.isArray(items)) {
            this.handleToggleCollapse();
        }
        if (onClickProp) {
            onClickProp(e, this.props.item);
        }
    }
    //<div className="drawer-item-text">{label}</div>
    render() {
        const { route, label, items, Icon, onClick: onClickProp } = this.props.item;
        let expandIcon;

        if (Array.isArray(items) && items.length) {
            expandIcon = !this.state.collapsed ? (
                <ExpandLessIcon
                    className={classnames({
                        'drawer-item-expand-arrow': true,
                        'drawer-item-expand-arrow-expanded': true ,
                    })}
                />
            ) : (
                <ExpandMoreIcon className="drawer-item-expand-arrow"/>
            );
        }
        
        return (
            <React.Fragment>
                <ListItem
                    className="drawer-item"
                    onClick={this.onClick}
                    button
                    dense
                    { ...this.props.rest }
                >
                    <div
                        style={{ paddingLeft: this.props.depth * this.props.depthStep }}
                        className="drawer-item-content"
                    >
                        { Icon && Icon.src && React.createElement(Icon.src, Icon.props) }
                        { route? (
                            <NavLink className="drawer-item-text" to={route}>
                                {label}
                            </NavLink>
                        ) : label? (
                            <div className="drawer-item-text">{label}</div>
                        ) : null }
                    </div>
                    {expandIcon}                    
                </ListItem>
                <Collapse in={!this.state.collapsed} timout="auto" unmountOnExit>
                     {Array.isArray(items) ? (
                         <List disablePadding dense>
                             {items.map((subItem, index) => (
                                 <React.Fragment key={subItem.name + index}>
                                    {subItem === 'divider' ? (
                                        <Divider style={{ margin: "6px 0" }} />                                        
                                    ): (
                                        <SideBarItem
                                            depthStep={this.props.depthStep}
                                            depth={this.props.depth + 1}
                                            item={subItem}
                                        />
                                    )}
                                </React.Fragment>
                             ))}
                         </List>
                     ): null }
                </Collapse>
            </React.Fragment>
        )
    }
} 