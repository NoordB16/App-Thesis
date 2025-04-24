import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '@/store/tasks';
import { useAnalytics } from '../../services/analytics';
import { trackClick } from '../../services/tracking';

type FilterType = 'all' | 'due';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tasks = useTasks((state) => state.tasks);
  const updateTask = useTasks((state) => state.updateTask);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const date = new Date();
    const diff = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(date.getDate() - diff);
    return date;
  });
  const [filter, setFilter] = useState<FilterType>('all');
  const analytics = useAnalytics();

  const selectedDateTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const isSameDate =
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear();

    if (filter === 'all') {
      return isSameDate && !task.completed;
    } else {
      return isSameDate && task.completed;
    }
  });

  const calculateTaskHeight = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60); // duration in minutes
    const baseHeight = 80; // minimum height in pixels
    const heightPerHour = 40; // additional height per hour
    const hours = duration / 60;
    return baseHeight + (hours * heightPerHour);
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, { ...task, completed });
    }
  };

  // Get current month and year in Dutch
  const currentDate = new Date();
  const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
  const monthYear = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

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

  const handleTaskPress = (task: Task) => {
    trackClick();
    router.push(`/task/${task.id}`);
  };

  const handleAddTask = () => {
    trackClick();
    router.push('/task/new');
  };

  const handleCheckboxPress = (task: Task) => {
    trackClick();
    handleTaskComplete(task.id, !task.completed);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{monthYear}</Text>
      </View>
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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}>
          <Text style={[styles.filterButtonText, filter === 'all' && styles.filterButtonTextActive]}>
            All ({tasks.filter(task => {
              const taskDate = new Date(task.date);
              return taskDate.getDate() === selectedDate.getDate() &&
                taskDate.getMonth() === selectedDate.getMonth() &&
                taskDate.getFullYear() === selectedDate.getFullYear() &&
                !task.completed;
            }).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'due' && styles.filterButtonActive]}
          onPress={() => setFilter('due')}>
          <Text style={[styles.filterButtonText, filter === 'due' && styles.filterButtonTextActive]}>
            Due ({tasks.filter(task => {
              const taskDate = new Date(task.date);
              return taskDate.getDate() === selectedDate.getDate() &&
                taskDate.getMonth() === selectedDate.getMonth() &&
                taskDate.getFullYear() === selectedDate.getFullYear() &&
                task.completed;
            }).length})
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {selectedDateTasks.map((task) => (
          <View key={task.id} style={styles.taskContainer}>
                <TouchableOpacity 
              style={[
                styles.task,
                task.completed && styles.taskCompleted,
                { height: calculateTaskHeight(task.startTime, task.endTime) }
              ]}
              onPress={() => handleTaskPress(task)}>
                  <View style={styles.taskContent}>
                <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                  {task.title}
                </Text>
                <Text style={[styles.taskTime, task.completed && styles.taskTimeCompleted]}>
                  {new Date(task.startTime).toLocaleTimeString('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })} -{' '}
                  {new Date(task.endTime).toLocaleTimeString('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                    </Text>
                  </View>
                  <TouchableOpacity 
                style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
                onPress={() => handleCheckboxPress(task)}>
                {task.completed && <Check size={16} color="#fff" />}
              </TouchableOpacity>
                </TouchableOpacity>
              </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.addButton, { bottom: insets.bottom + 20 }]}
        onPress={handleAddTask}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  content: {
    flex: 1,
    padding: 20,
  },
  taskContainer: {
    marginBottom: 10,
  },
  task: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskCompleted: {
    backgroundColor: '#f5f5f5',
  },
  taskContent: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  taskTime: {
    fontSize: 14,
    color: '#666',
  },
  taskTimeCompleted: {
    color: '#999',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    },
  filterButtonTextActive: {
    color: '#fff',
  },
});