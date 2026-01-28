import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

export interface NavbarAction {
  key: string;
  label: string;
  icon?: string;
  danger?: boolean;
  onPress: () => void;
}

export interface NavbarProps {
  collapsed?: boolean; // injected by DashboardLayout
  showDropdown?: boolean; // injected by DashboardLayout
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>; // injected by DashboardLayout
  title: string;
  userLabel: string;
  actions: NavbarAction[];
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  collapsed = true,
  showDropdown = false,
  setShowDropdown = () => {}, // default no-op
  userLabel,
  actions = [], // default empty array
}) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View
      className="h-32 bg-gray-800 flex-row items-center justify-between border-b border-gray-700 pt-12"
      style={{ paddingHorizontal: collapsed ? 12 : 20 }}
    >
      {/* Left spacer */}
      <View style={ collapsed? { width: screenWidth/7 }: {width: screenWidth/30}} />

      {/* Title */}
      <Text className="text-xl font-bold text-white">{title}</Text>

      {/* User menu */}
      <View style={{ position: 'relative' }}>
        {collapsed && (
          <TouchableOpacity
            onPress={() => setShowDropdown(prev => !prev)}
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold">
              {userLabel} <Text className='text-xs'>{showDropdown ? '▲' : '▼'}</Text>
            </Text>
          </TouchableOpacity>
        )}

        {showDropdown && (
          <View
            className="absolute mt-9 bg-gray-100 rounded shadow-xxl z-50 w-44"
            style={{ right: -5 }}
          >
            {actions.map(action => (
              <TouchableOpacity
                key={action.key}
                className="px-5 py-3 border-b border-gray-300"
                onPress={() => {
                  setShowDropdown(false);
                  action.onPress();
                }}
              >
                <Text
                  className={action.danger ? 'text-red-500 font-semibold' : undefined}
                >
                  {`${action.icon ?? ''} ${action.label}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};