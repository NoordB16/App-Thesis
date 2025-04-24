import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Task } from '@/types';
import TaskList from './TaskList';

interface CalendarViewProps {
  tasks: Task[];
}

export default function CalendarView({ tasks }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const date = new Date();
    const diff = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(date.getDate() - diff);
    return date;
  });

  const selectedDateTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  const today = new Date();

  const getDaysInWeek = () => {
    const days = [];
    const current = new Date(currentWeekStart);

    for (let i = 0; i < 7; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekView}>
        <TouchableOpacity onPress={goToPreviousWeek} style={styles.arrowButton}>
          <ChevronLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        {getDaysInWeek().map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              date.getDate() === selectedDate.getDate() && styles.selectedDay,
              date.getDate() === today.getDate() && styles.today,
            ]}
            onPress={() => setSelectedDate(date)}>
            <View style={styles.textContainer}>
              <Text style={styles.dayName}>{weekDays[index]}</Text>
              <Text style={styles.dayNumber}>{date.getDate()}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={goToNextWeek} style={styles.arrowButton}>
          <ChevronRight size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <TaskList tasks={selectedDateTasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekView: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
  },
  dayContainer: {
    width: 40,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 2,
  },
  textContainer: {
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  today: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  dayName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: 8,
    marginHorizontal: 5,
  },
});