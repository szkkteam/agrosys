import React from 'react'
import { connect } from 'react-redux'

import Notification from 'components/Notification'

import Container from '@material-ui/core/Container';

import './pagecontent.scss'

//<div style={{flexGrow: 1}}>
class PageContent extends React.Component {

  static defaultProps = {
    className: '',
  }

  render() {
    const { children, className  } = this.props
    return (
      <div className="main-content">
        <div className="content-spacer"/>
        <Notification />
        {children}
      </div> 
    )
  }
}

export default PageContent
