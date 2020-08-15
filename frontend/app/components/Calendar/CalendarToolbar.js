import React from 'react'
import moment from 'moment'
import * as dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'

import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";

//import MomentUtils from '@material-ui/pickers/adapter/moment';
/**
 * 
 */

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export default class CalendarToolbar extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        start: props.start,
        end: props.end
      }
    }

    render() {
      let {
        localizer: { messages = {} } = {},
        label,
        date,
        length,
        view,
        onStartDateChange,
        onEndDateChange,
        ...rest,
      } = this.props

      const { start, end } = this.state

        console.log("Start: ", start)
        console.log("End: ", end)
        return (
        <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            { view === 'list'? 
            <span>
                <DatePicker
                    value={start}
                    onChange={(data) => {
                      onStartDateChange && onStartDateChange(data.toDate())
                      //this.navigate(navigate.PREVIOUS, data.toDate())
                      this.setState({start: data.toDate()}, () => this.navigate(navigate.PREVIOUS, this.state.start))
                    }}
                    renderInput={(props) => <TextField {...props} />}
                />
                <DatePicker
                    value={end}
                    onChange={(data) => { 
                      onEndDateChange && onEndDateChange(data.toDate())
                      this.setState({end: data.toDate()}, () => this.navigate(navigate.NEXT, this.state.start))
                    }}
                    renderInput={(props) => <TextField {...props} />}
                />
            </span>:
            <span>
                <button
                    type="button"
                    onClick={this.navigate.bind(null, navigate.TODAY)}
                >
                    {messages.today}
                </button>
                <button
                    type="button"
                    onClick={this.navigate.bind(null, navigate.PREVIOUS)}
                >
                    {messages.previous}
                </button>
                <button
                    type="button"
                    onClick={this.navigate.bind(null, navigate.NEXT)}
                >
                    {messages.next}
                </button>
            </span>
            }
            
          </span>
  
          <span className="rbc-toolbar-label">{label}</span>
  
          <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
        </div>
      )
    } 
  
    navigate = (action, value) => {
      console.log("Navigate value: ", value)
      this.props.onNavigate(action, value)        
    }
  
    view = view => {
      this.props.onView(view)
    }
  
  
    viewNamesGroup(messages) {
      let viewNames = this.props.views
      const view = this.props.view
      console.log("viewNames: ", viewNames)
      if (viewNames.length > 1) {
        return viewNames.map(name => (
          <button
            type="button"
            key={name}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        ))
      }
    }
  }
  