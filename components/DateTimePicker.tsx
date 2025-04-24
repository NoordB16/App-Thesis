import React from 'react';
import { Platform } from 'react-native';
import DateTimePickerNative from '@react-native-community/datetimepicker';
import { DateTimePickerWeb } from './DateTimePickerWeb';

interface DateTimePickerProps {
  value: Date;
  onChange: (event: any, date?: Date) => void;
  mode: 'date' | 'time';
}

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  if (Platform.OS === 'web') {
    return <DateTimePickerWeb {...props} />;
  }

  return <DateTimePickerNative {...props} />;
};

export default DateTimePicker;