import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Flash from 'components/Flash'
import { ScrollIntoView } from 'components/Nav/HashLink'

//<div style={{flexGrow: 1}}>
class PageContent extends React.Component {

  static defaultProps = {
    className: '',
  }

  render() {
    const { children, className, location: { hash } } = this.props
    return (
      <div className="main-content">
        <Flash />
        <div className={`${className} content`}>
          <ScrollIntoView id={hash && hash.slice(1) || null}>
            {children}
          </ScrollIntoView>
        </div>
      </div> 
    )
  }
}

export default withRouter(PageContent)
