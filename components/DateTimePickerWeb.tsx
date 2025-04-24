import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DateTimePickerWebProps {
  value: Date;
  onChange: (event: any, date?: Date) => void;
  mode: 'date' | 'time';
}

export const DateTimePickerWeb: React.FC<DateTimePickerWebProps> = ({
  value,
  onChange,
  mode,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (mode === 'date') {
      const date = new Date(newValue);
      onChange({ type: 'set' }, date);
    } else if (mode === 'time') {
      const [hours, minutes] = newValue.split(':');
      const date = new Date(value);
      date.setHours(parseInt(hours), parseInt(minutes));
      onChange({ type: 'set' }, date);
    }
  };

  const formatValue = () => {
    if (mode === 'date') {
      return value.toISOString().split('T')[0]; // YYYY-MM-DD
    } else {
      return `${value.getHours().toString().padStart(2, '0')}:${value
        .getMinutes()
        .toString()
        .padStart(2, '0')}`; // HH:MM
    }
  };

  return (
    <View style={styles.container}>
      <input
        style={webInputStyle}
        type={mode}
        value={formatValue()}
        onChange={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

const webInputStyle = {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: '#fff',
  width: '100%',
}; 