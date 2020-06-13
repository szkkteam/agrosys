import React from 'react'
import Helmet from 'react-helmet'

import 'highlight.js/styles/tomorrow-night-eighties.css'

import { PageContent, PageHeader } from 'components'

import {
  EditableMap,
} from 'farm/components'

import './fields.scss'


export default class Fields extends React.Component {
 
  render() {
   
    return (
      <PageContent className="field-content" key="content">
        Fields
      </PageContent>
    )
  }
}
