import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Host } from "react-native-portalize";
import { Colors } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { useAtomValue, useSetAtom } from "jotai";
import * as Notifications from "expo-notifications";

import { HomeScreen } from "./src/components/screens/HomeScreen";
import { useColorScheme } from "./src/hooks/useColorScheme";
import { IconSymbol } from "./src/components/ui/IconSymbol";
import { SettingsScreen } from "./src/components/screens/SettingsScreen";
import { StatsScreen } from "./src/components/screens/StatsScreen";
import { scheduleLocalPushNotification } from "./src/utils/notifications";
import {
  addOrUpdateScheduledNotificationAtom,
  getScheduledNotificationsAtom,
  removeScheduledNotificationAtom,
} from "./src/state/notifications";
import { getSettingsAtom } from "./src/state/settings";

import { styles } from "./App.styles";

type DrawerIconProps = React.ComponentProps<typeof IconSymbol> & {
  isFocused: boolean;
};

const DrawerIcon = ({ isFocused, ...props }: DrawerIconProps) => (
  <IconSymbol
    {...props}
    size={32}
    color={isFocused ? Colors.violet10 : "black"}
  />
);

type SpecificDrawerIconProps = { focused: boolean };

const HomeDrawerIcon = ({ focused }: SpecificDrawerIconProps) => (
  <DrawerIcon name="home" isFocused={focused} />
);

const StatsDrawerIcon = ({ focused }: SpecificDrawerIconProps) => (
  <DrawerIcon name="bar-chart" isFocused={focused} />
);

const SettingsDrawerIcon = ({ focused }: SpecificDrawerIconProps) => (
  <DrawerIcon name="settings" isFocused={focused} />
);

const Drawer = createDrawerNavigator();

function RootStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: Colors.violet60,
        drawerActiveTintColor: Colors.violet10,
        drawerInactiveTintColor: "#212427",
        drawerLabelStyle: styles.drawerLabel,
        drawerItemStyle: styles.drawerItem,
        drawerType: "back",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: HomeDrawerIcon,
        }}
      />
      <Drawer.Screen
        name="Stats"
        component={StatsScreen}
        options={{ drawerIcon: StatsDrawerIcon }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerIcon: SettingsDrawerIcon }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const colorScheme = useColorScheme();

  const addOrUpdateScheduledNotification = useSetAtom(
    addOrUpdateScheduledNotificationAtom
  );
  const removeScheduledNotification = useSetAtom(
    removeScheduledNotificationAtom
  );

  const { allowDailyReminders } = useAtomValue(getSettingsAtom);
  const scheduledNotifications = useAtomValue(getScheduledNotificationsAtom);

  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(true);
  const [
    hasCheckedNotificationPermissionStatus,
    setHasCheckedNotificationPermissionStatus,
  ] = useState(false);

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  useEffect(() => {
    if (!allowDailyReminders || !areNotificationsEnabled) {
      removeScheduledNotification("main-reminder").finally(() =>
        console.info("removed scheduled notification")
      );
    }
  }, [allowDailyReminders, areNotificationsEnabled]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      Notifications.getPermissionsAsync().then(({ status }) => {
        setAreNotificationsEnabled(status === "granted");
        setHasCheckedNotificationPermissionStatus(true);
      });
    }, 1_000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!hasCheckedNotificationPermissionStatus) {
      return;
    }

    if (
      scheduledNotifications["main-reminder"] ||
      !allowDailyReminders ||
      !areNotificationsEnabled
    ) {
      return;
    }

    scheduleLocalPushNotification(
      "Reminder:",
      "Don't forget to update your habit progress!"
    )
      .then((id) => {
        addOrUpdateScheduledNotification("main-reminder", id);
        console.info("added notification", id);
      })
      .catch((e) => console.error(e));
  }, [
    scheduledNotifications,
    allowDailyReminders,
    areNotificationsEnabled,
    hasCheckedNotificationPermissionStatus,
  ]);

  return (
    <ThemeProvider value={theme}>
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <NavigationContainer>
          <Host>
            <RootStack />
            <StatusBar backgroundColor={theme.colors.background} />
          </Host>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
