import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { NavigationProp, useRoute } from '@react-navigation/native';

export interface SidebarMenuItem {
  key: string;
  label: string;
  icon?: string;
  badgeCount?: number;
  routeName: string;
}

export interface SidebarProps {
  collapsed?: boolean;
  sidebarWidth?: Animated.Value;
  user: {
    name?: string;
    email?: string;
    avatar?: any;
  };
  menuItems: any[];
  footerText?: string;
  navigation: NavigationProp<any>;
}


export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  sidebarWidth,
  user,
  menuItems,
  footerText = 'Powered by CodingCops ©',
  navigation,
}) => {
  if (collapsed) return null;
  const route = useRoute();
  return (
    <Animated.View
      className="bg-gray-800 flex-1 p-4 justify-between"
      style={{ width: sidebarWidth }}
    >
      <View>
        {/* User info */}
        <View className="mt-24 mb-6">
          <Image
            source={user?.avatar}
            className="w-16 h-16 rounded-full mb-2 ml-4"
          />
          <Text className="text-white font-bold text-lg" numberOfLines={1}>
            {user?.name}
          </Text>
          <Text className="text-gray-300 text-sm" numberOfLines={1}>
            {user?.email}
          </Text>
        </View>

        {/* Menu */}
        <View className="border-t border-gray-500 pt-8">
          {menuItems.map(item => {
            const isActive = route.name === item.routeName;
          return(
            <TouchableOpacity
              key={item.key}
              onPress={() => navigation.navigate(item.routeName)}
              className="mb-7 flex-row items-center justify-between"
            >
              <Text
                className={`${
                  isActive ? 'text-green-400 text-lg font-bold border-l border-r px-1 border-green-400' : 'text-lg text-white'
                }`}
              >
                {`${item.icon ?? ''} ${item.label}`}
              </Text>

              {item.badgeCount ? (
                <View className="bg-red-500 rounded-full h-6 min-w-[24px] px-1 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {item.badgeCount > 99 ? '99+' : item.badgeCount}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          )})}
        </View>
      </View>

      {/* Footer */}
      <View className="mb-4">
        <View className="border-t border-gray-500 mb-4" />
        <Text className="text-gray-400 mb-2 text-center text-[10px] tracking-widest uppercase">
          {footerText}
        </Text>
      </View>
    </Animated.View>
  );
};