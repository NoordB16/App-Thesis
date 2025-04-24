import { create } from 'zustand';

interface SettingsState {
  showCompletedTasks: boolean;
  toggleShowCompletedTasks: () => void;
}

export const useSettings = create<SettingsState>((set) => ({
  showCompletedTasks: true,
  toggleShowCompletedTasks: () =>
    set((state) => ({ showCompletedTasks: !state.showCompletedTasks })),
}));