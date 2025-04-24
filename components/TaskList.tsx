import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Task } from '@/types';
import { useTasks } from '@/store/tasks';
import { useSettings } from '@/store/settings';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const router = useRouter();
  const { toggleTaskCompletion } = useTasks();
  const { showCompletedTasks } = useSettings();

  const filteredTasks = showCompletedTasks
    ? tasks
    : tasks.filter((task) => !task.completed);

  return (
    <View style={styles.container}>
      {filteredTasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          style={[styles.task, task.completed && styles.taskCompleted]}
          onPress={() => router.push(`/task/${task.id}`)}>
          <TouchableOpacity
            style={[styles.checkbox, task.completed && styles.checkboxChecked]}
            onPress={() => toggleTaskCompletion(task.id)}>
            {task.completed && <Check size={16} color="#fff" />}
          </TouchableOpacity>
          <View style={styles.taskContent}>
            <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
              {task.title}
            </Text>
            <Text style={styles.taskTime}>
              {new Date(task.startTime).toLocaleTimeString()} -{' '}
              {new Date(task.endTime).toLocaleTimeString()}
            </Text>
          </View>
          <Text style={styles.taskIcon}>{task.icon}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  taskContent: {
    flex: 1,
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
  taskIcon: {
    fontSize: 24,
    marginLeft: 15,
  },
});