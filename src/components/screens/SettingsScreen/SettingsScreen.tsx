import React, { useEffect, useState } from "react";
import Dialog from "react-native-dialog";
import { Button, Checkbox, Spacings, Toast } from "react-native-ui-lib";
import { useAtomValue, useSetAtom } from "jotai";
import * as Notifications from "expo-notifications";

import ParallaxScrollView from "../../ParallaxScrollView";
import { ThemedText } from "../../ThemedText";
import { ThemedView } from "../../ThemedView";
import { IconSymbol } from "../../ui/IconSymbol";
import { getSecondaryHabitTypeColor } from "../../../utils/colors";
import { clearTrackedHabitsAtom } from "../../../state/trackedHabits";
import { clearCustomHabitsAtom } from "../../../state/customHabits";
import {
  getSettingsAtom,
  getUpdateSettingsAtom,
} from "../../../state/settings";
import { openAppSettings } from "../../../utils/settings";

import { styles } from "./SettingsScreen.styles";

export function SettingsScreen() {
  const { allowDailyReminders } = useAtomValue(getSettingsAtom);

  const updateSettings = useSetAtom(
    getUpdateSettingsAtom("allowDailyReminders")
  );

  const clearCustomHabits = useSetAtom(clearCustomHabitsAtom);
  const clearTrackedHabits = useSetAtom(clearTrackedHabitsAtom);

  const [allowDailyRemindersCheckbox, setAllowDailyRemindersCheckbox] =
    useState(allowDailyReminders);
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(true);
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const [shouldShowConfirmationDialog, setShouldShowConfirmationDialog] =
    useState(false);

  useEffect(() => {
    setAllowDailyRemindersCheckbox(allowDailyReminders);
  }, [allowDailyReminders]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      Notifications.getPermissionsAsync().then(({ status }) => {
        setAreNotificationsEnabled(status === "granted");
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="settings"
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Settings
            </ThemedText>
          </ThemedView>
          <ThemedText>
            Explore and adjust your app settings right here
          </ThemedText>
          {areNotificationsEnabled && (
            <ThemedView>
              <Checkbox
                value={allowDailyRemindersCheckbox}
                label="Stay motivated—get daily habit notifications"
                onValueChange={updateSettings}
              />
            </ThemedView>
          )}
          {!areNotificationsEnabled && (
            <ThemedView>
              <ThemedText style={styles.notificationText}>
                Notifications are disabled, enable them to receive daily
                reminders to track your habits
              </ThemedText>
              <Button
                label="Enable notifications"
                backgroundColor="#2980b9"
                onPress={openAppSettings}
              ></Button>
            </ThemedView>
          )}
          <ThemedView>
            <ThemedText style={styles.deleteDataText}>
              You can delete your data anytime by clicking the button bellow.
            </ThemedText>
            <Button
              backgroundColor={getSecondaryHabitTypeColor("bad")}
              label="Delete all data"
              children={
                <IconSymbol size={20} color="white" name="delete-outline" />
              }
              onPress={() => setShouldShowConfirmationDialog(true)}
              style={styles.deleteAllDataButton}
            />
          </ThemedView>

          <Dialog.Container
            visible={shouldShowConfirmationDialog}
            onRequestClose={() => setShouldShowConfirmationDialog(false)}
          >
            <Dialog.Title>Reset data?</Dialog.Title>
            <Dialog.Description>
              All your data, including habits you have created and tracked will
              be lost
            </Dialog.Description>
            <Dialog.Button
              label="Cancel"
              onPress={() => setShouldShowConfirmationDialog(false)}
            />
            <Dialog.Button
              label="Reset"
              onPress={() => {
                clearTrackedHabits();
                clearCustomHabits();
                setShouldShowConfirmationDialog(false);
                setShouldShowToast(true);
              }}
            />
          </Dialog.Container>
        </ThemedView>
      </ParallaxScrollView>
      <Toast
        visible={shouldShowToast}
        position="bottom"
        autoDismiss={2000}
        backgroundColor="#27ae60"
        message="Your data has been deleted"
        onDismiss={() => {
          setShouldShowToast(false);
        }}
        onClose={() => {
          setShouldShowToast(false);
        }}
      />
    </>
  );
}
