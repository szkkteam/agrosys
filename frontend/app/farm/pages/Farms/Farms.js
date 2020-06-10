import React from 'react'
import Helmet from 'react-helmet'

import 'highlight.js/styles/tomorrow-night-eighties.css'

import { PageContent, PageHeader } from 'components'

import {
  EditableMap,
} from 'farm/components'

import './farms.scss'


export default class Farms extends React.Component {
 
  render() {
   
    return (
      <PageContent className="farm-content" key="content">
        <Helmet>
          <title>
            Farm View
          </title>
          <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
          <script src="https://npmcdn.com/leaflet.path.drag/src/Path.Drag.js"></script>
        </Helmet>
        <h1>
          Farm test page
        </h1>
        <div>
          <EditableMap/>
        </div>
      </PageContent>
    )
  }
}
