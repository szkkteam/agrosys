import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'

import { Calendar as BigCalendar, Views, momentLocalizer  } from 'react-big-calendar'
import moment from 'moment'
import * as dates from 'react-big-calendar/lib/utils/dates'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import MomentUtils from '@material-ui/pickers/adapter/moment';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
          backgroundColor: 'lightblue',
        },
    })

const DraggableCalendar = withDragAndDrop(BigCalendar);


const Calendar = ({
    disabled=false,
    ...props
}) => {
    const localizer = momentLocalizer(moment)    

    const CalendarComponent = disabled? Calendar: DraggableCalendar

    return (
      <CalendarComponent
          disabled={disabled}
          selectable
          //step={60}
          //showMultiDayTimes
          events={[]} // FIXME
          messages={{
              list: 'List',
          }}
          views={{
              month: true,
              week: true,
              day: true,
          }}
          //defaultDate={startDate}              
          //length={length}
          //defaultView="list"
          components={{
              timeSlotWrapper: ColoredDateCellWrapper,
              //event: CalendarTask,
              /*
              toolbar: (props) => <CalendarToolbar
                                    start={startDate}
                                    end={endDate}
                                    onEndDateChange={(data) => this.setState({endDate: data})}
                                    onStartDateChange={(data) => this.setState({startDate: data})}
                                    {...props}/>
              */
            }}
            localizer={localizer}
            {...props}
      /> 
        
    )
}

Calendar.propTypes = {
    disabled: PropTypes.bool,

}

import sizeMe, { SizeMe } from 'react-sizeme'

const Container = (props) => (
    <SizeMe monitorHeight monitorWidth noPlaceholder>
    {({ size }) => 
        <Calendar {...props} {...size}/>
        
    }
    </SizeMe>
)

export default Container