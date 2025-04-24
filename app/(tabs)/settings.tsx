import { View, Text, StyleSheet, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/store/settings';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { showCompletedTasks, toggleShowCompletedTasks } = useSettings();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Show Completed Tasks</Text>
          <Switch
            value={showCompletedTasks}
            onValueChange={toggleShowCompletedTasks}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={showCompletedTasks ? '#007AFF' : '#f4f3f4'}
          />
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
  },
});