import React from 'react'
import Helmet from 'react-helmet'

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import 'highlight.js/styles/tomorrow-night-eighties.css'

import { PageContent, PageHeader } from 'components'


import './farms.scss'


export default class Farms extends React.Component {
 
  render() {
   
    return (
      <PageContent className="farm-content" key="content">
        <Helmet>
          <title>
            Farm View
          </title>
        </Helmet>
        <h1>
          Farm test page
        </h1>
        <Map center={[45.4, -75.7]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </PageContent>
    )
  }
}
