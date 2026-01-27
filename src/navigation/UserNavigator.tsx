import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserHome } from '@/screens/user/UserHome';
import { UserSettings } from '@/screens/user/UserSettings';
import { AssignedTasks } from '@/screens/user/AssignedTasks';
import { TasksStatus } from '@/screens/user/TasksStatus';

const Stack = createNativeStackNavigator();

export type UserStackParamList = {
  UserHome: undefined;
  UserSettings: undefined;
  AssignedTasks: undefined;
  TasksStatus: undefined;
};
export const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="UserSettings" component={UserSettings} />
      <Stack.Screen name="AssignedTasks" component={AssignedTasks} />
      <Stack.Screen name="TasksStatus" component={TasksStatus} />
    </Stack.Navigator>
  );
};
