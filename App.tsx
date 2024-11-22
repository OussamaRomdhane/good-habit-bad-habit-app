import * as React from "react";
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

import { HomeScreen } from "./src/components/screens/HomeScreen";
import { useColorScheme } from "./src/hooks/useColorScheme";
import { IconSymbol } from "./src/components/ui/IconSymbol";
import { SettingsScreen } from "./src/components/screens/SettingsScreen";
import { StatsScreen } from "./src/components/screens/StatsScreen";

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

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

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
