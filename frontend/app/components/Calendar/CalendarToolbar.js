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
        end: props.end,
        startOpen: false,
        endOpen: false,
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
        ...rest
      } = this.props

      const { start, end, startOpen, endOpen } = this.state

      return (
        <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            { view === 'list'? 
            <span>
                <DatePicker
                    value={start}
                    open={startOpen}
                    maxDate={end}
                    onClose={() => this.setState({startOpen: false})}
                    onOpen={() => this.setState({startOpen: true, endOpen: false})}
                    onChange={(data) => {
                      onStartDateChange && onStartDateChange(data.toDate())
                      //this.navigate(navigate.PREVIOUS, data.toDate())
                      this.setState({start: data.toDate(), startOpen: false}, () => this.navigate(navigate.PREVIOUS, this.state.start))
                    }}
                    renderInput={(props) => <TextField {...props} />}
                />
                <DatePicker
                    value={end}
                    open={endOpen}
                    minDate={start}
                    onOpen={() => this.setState({endOpen: true, startOpen: false})}
                    onClose={() => this.setState({endOpen: false})}
                    onChange={(data) => { 
                      onEndDateChange && onEndDateChange(data.toDate())
                      this.setState({end: data.toDate(), endOpen: false}, () => this.navigate(navigate.NEXT, this.state.start))
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
      const view = this.props.view
      if (view === "list") this.props.onNavigate(action, value)        
      else this.props.onNavigate(action)        
    }
  
    view = view => {
      this.props.onView(view)
    }
  
  
    viewNamesGroup(messages) {
      let viewNames = this.props.views
      const view = this.props.view
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
  