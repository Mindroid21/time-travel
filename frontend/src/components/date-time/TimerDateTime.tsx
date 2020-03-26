import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker
  } from "material-ui-pickers";
export interface ITimerData {
    type: string;
    date: string;
    time: string;
};

export function TimerDateTime() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  const handleDateChange = (date: any) => {
    console.log('Data is: ', date);  
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid item xs={12} md={6}>
            <DatePicker
              keyboard
              placeholder="MM/DD/YYYY"
              format={"MM/DD/YYYY"}
              // handle clearing outside => pass plain array if you are not controlling value outside
              mask={value =>
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              value={selectedDate}
              onChange={handleDateChange}
              label="Choose Date"
              disableOpenOnEnter
              animateYearScrolling={false}
              autoOk={true}
              clearable
              />
        </Grid>
        <Grid item xs={12} md={6}>
            <TimePicker
                keyboard
                margin="normal"
                id="time-picker"
                label="Choose Time"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk={true}
                clearable
                />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}