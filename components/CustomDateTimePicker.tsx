import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from './DateTimePicker';

interface Props {
  date: Date;
  startTime: Date;
  endTime: Date;
  onDateChange: (date: Date) => void;
  onStartTimeChange: (time: Date) => void;
  onEndTimeChange: (time: Date) => void;
}

export default function CustomDateTimePicker({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Datum</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString('nl-NL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                onDateChange(selectedDate);
              }
            }}
          />
        )}
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeInputContainer}>
          <Text style={styles.label}>Starttijd</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.timeText}>
              {startTime.toLocaleTimeString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              onChange={(event, selectedTime) => {
                setShowStartTimePicker(false);
                if (selectedTime) {
                  onStartTimeChange(selectedTime);
                }
              }}
            />
          )}
        </View>

        <View style={styles.timeInputContainer}>
          <Text style={styles.label}>Eindtijd</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowEndTimePicker(true)}>
            <Text style={styles.timeText}>
              {endTime.toLocaleTimeString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              onChange={(event, selectedTime) => {
                setShowEndTimePicker(false);
                if (selectedTime) {
                  onEndTimeChange(selectedTime);
                }
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  dateContainer: {
    gap: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  timeInputContainer: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dateButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  timeButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
}); 