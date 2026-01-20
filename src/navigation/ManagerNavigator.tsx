import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagerHome } from '@/screens/manager/ManagerHome';
import { ManagerSettings } from '@/screens/manager/ManagerSettings';
import {AssignTasks} from '@/screens/manager/AssignTasks';
import {ReviewTasks} from '@/screens/manager/ReviewTasks';
import {CreateTasks} from '@/screens/manager/CreateTasks';
import {ViewTasks} from '@/screens/manager/ViewTasks';

const Stack = createNativeStackNavigator();

export type ManagerStackParamList = {
  ManagerHome: undefined;
  ManagerSettings: undefined;
  AssignTasks: undefined;
  ReviewTasks: undefined;
  ViewTasks: undefined;
  CreateTasks: undefined;
};
export const ManagerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManagerHome" component={ManagerHome} />
      <Stack.Screen name="AssignTasks" component={AssignTasks} />
      <Stack.Screen name="ReviewTasks" component={ReviewTasks} />
      <Stack.Screen name="ManagerSettings" component={ManagerSettings} />
      <Stack.Screen name="CreateTasks" component={CreateTasks} />
      <Stack.Screen name="ViewTasks" component={ViewTasks} />
    </Stack.Navigator>
  );
};
