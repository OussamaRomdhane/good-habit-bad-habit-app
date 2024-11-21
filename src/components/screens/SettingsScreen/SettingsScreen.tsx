import React, { useState } from "react";
import Dialog from "react-native-dialog";
import { Button, Toast, View, Text, Spacings } from "react-native-ui-lib";
import { useSetAtom } from "jotai";
import { KeyboardAvoidingView } from "react-native";

import ParallaxScrollView from "../../ParallaxScrollView";
import { ThemedText } from "../../ThemedText";
import { ThemedView } from "../../ThemedView";
import { IconSymbol } from "../../ui/IconSymbol";
import { getSecondaryHabitTypeColor } from "../../../utils/colors";
import { clearTrackedHabitsAtom } from "../../../state/trackedHabits";
import { clearCustomHabitsAtom } from "../../../state/customHabits";

import { styles } from "./SettingsScreen.styles";

export function SettingsScreen() {
  const clearTrackedHabits = useSetAtom(clearTrackedHabitsAtom);
  const clearCustomHabits = useSetAtom(clearCustomHabitsAtom);

  const [shouldShowToast, setShouldShowToast] = useState(false);
  const [shouldShowConfirmationDialog, setShouldShowConfirmationDialog] =
    useState(false);

  return (
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
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>
        </ThemedView>
        <ThemedText>
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
        <Toast
          visible={shouldShowToast}
          position={"bottom"}
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
        <Dialog.Container
          visible={shouldShowConfirmationDialog}
          onRequestClose={() => setShouldShowConfirmationDialog(false)}
        >
          <Dialog.Title>Reset data?</Dialog.Title>
          <Dialog.Description>
            All your data, including habits you have created and tracked will be
            lost
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
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}
