import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserStackParamList } from '@/navigation/UserNavigator';
import { RootStackParamList } from '@/navigation/AppNavigator';

interface UserNavbarProps {
  collapsed: boolean;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const UserNavbar: React.FC<UserNavbarProps> = ({
  collapsed,
  showDropdown,
  setShowDropdown,
}) => {
  const { user, logout } = useAuth();
  const navigationUser = useNavigation<NativeStackNavigationProp<UserStackParamList>>();
  const navigationRoot = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Redirect if no roles
  React.useEffect(() => {
    if (!user?.role) {
      logout();
    }
  }, [user]);

  return (
    <View
      className="h-32 bg-gray-800 flex-row items-center justify-between border-b border-gray-700 pt-12"
      style={{ paddingHorizontal: collapsed ? 12 : 20 }}
    >
      <View style={{ width: 24 }} />
      <Text className="text-xl font-bold text-white">User Portal</Text>

      <View style={{ position: 'relative' }}>
        {collapsed && (
          <TouchableOpacity
            onPress={() => setShowDropdown(prev => !prev)}
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold">
              👨🏻‍💼 {user?.role} {showDropdown ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
        )}

        {showDropdown && (
          <View
            className="absolute mt-9 bg-gray-100 rounded shadow-xxl z-50 w-44"
            style={{ right: -5 }}
          >
            <TouchableOpacity
              className="px-5 py-3 border-b border-gray-300"
              onPress={() => {
                setShowDropdown(false);
                navigationUser.navigate('UserSettings');
              }}
            >
              <Text>⚙️ Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-5 py-3"
              onPress={() => {
                setShowDropdown(false);
                logout();
                navigationRoot.navigate('Landing');
              }}
            >
              <Text className="text-red-500 font-semibold">🚪 Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
