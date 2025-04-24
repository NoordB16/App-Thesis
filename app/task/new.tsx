import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import CustomDateTimePicker from '@/components/CustomDateTimePicker';
import { useTasks } from '@/store/tasks';
import { generateTaskIcon } from '@/utils/icons';

export default function NewTaskScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000));

  const handleSave = () => {
    if (!title) return;

    const task = {
      id: Date.now().toString(),
      title,
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      icon: generateTaskIcon(title),
      completed: false,
    };

    addTask(task);
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, !title && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!title}>
          <Text
            style={[styles.saveButtonText, !title && styles.saveButtonTextDisabled]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Task title"
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        <CustomDateTimePicker
          date={date}
          startTime={startTime}
          endTime={endTime}
          onDateChange={setDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
      </View>
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
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#fff8',
  },
  content: {
    padding: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});