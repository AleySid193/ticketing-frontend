import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SIDEBAR = {
  COLLAPSED: 0,
  EXPANDED: SCREEN_WIDTH * 0.5,
};

export interface DashboardLayoutProps {
  sidebar: React.ReactElement | React.ReactNode;
  navbar: React.ReactElement | React.ReactNode;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  navbar,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSidebar = () => setCollapsed(prev => !prev);

  const closeAll = () => {
    if (!collapsed) setCollapsed(true);
    if (showDropdown) setShowDropdown(false);
  };

  const hamburgerLeft = collapsed ? 12 : SIDEBAR.EXPANDED - 40;

  // Helper to inject props into child components if they are valid React elements
  const injectProps = <T extends {}>(element: React.ReactNode, props: T) => {
    return React.isValidElement(element)
      ? React.cloneElement(element as React.ReactElement<T>, props)
      : element;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Sidebar */}
        <View style={{ width: collapsed ? SIDEBAR.COLLAPSED : SIDEBAR.EXPANDED }}>
          {injectProps(sidebar, { collapsed })}
        </View>

        {/* Hamburger */}
        <View
          style={{
            position: 'absolute',
            top: 70,
            left: hamburgerLeft,
            zIndex: 1000,
          }}
        >
          <TouchableOpacity onPress={toggleSidebar} activeOpacity={1}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
              <View
                style={{
                  height: 2,
                  width: 24,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  marginBottom: 4,
                }}
              />
              <View
                style={{
                  height: 2,
                  width: collapsed ? 24 : 14,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  marginBottom: 4,
                }}
              />
              <View
                style={{
                  height: 2,
                  width: collapsed ? 24 : 8,
                  backgroundColor: 'white',
                  borderRadius: 1,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <View style={{ flex: 1 }}>
          {injectProps(navbar, { collapsed, showDropdown, setShowDropdown })}

          <TouchableWithoutFeedback onPress={closeAll}>
            <View style={{ flex: 1 }}>{children}</View>
          </TouchableWithoutFeedback>

          {/* Dim overlay */}
          {!collapsed && (
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.15)',
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
