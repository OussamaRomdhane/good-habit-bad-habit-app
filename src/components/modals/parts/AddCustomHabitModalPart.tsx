import {
  Button,
  Colors,
  RadioButton,
  RadioGroup,
  Text,
  TextField,
  Toast,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import EmojiPicker from "rn-emoji-keyboard";
import { useSetAtom } from "jotai/react";
import React, { useState } from "react";
import { ScrollView } from "react-native";

import { IconSymbol } from "../../ui/IconSymbol";
import { closeCurrentOpenModalAtom } from "../../../state/modals";
import { addCustomHabitAtom } from "../../../state/customHabits";

import { styles } from "./AddCustomHabitModalPart.styles";

const AddACustomHabitModalPart = ({
  setCurrentView,
}: {
  setCurrentView: (currentView: AddAHabitModalParts) => void;
}) => {
  const closeCurrentOpenModal = useSetAtom(closeCurrentOpenModalAtom);

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const [habitName, setHabitName] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState<string | undefined>();
  const [habitType, setHabitType] = useState<HabitType | undefined>(undefined);

  const [toastText, setToastText] = useState("");
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const addCustomHabit = useSetAtom(addCustomHabitAtom);

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text text60 style={styles.headerTitle}>
          Add a custom habit
        </Text>
        <IconSymbol
          size={32}
          name="close"
          color="#7f8c8d"
          onPress={() => {
            closeCurrentOpenModal();
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.nameAndEmojiContainer}>
          <TouchableOpacity
            style={[
              styles.emojiChoiceView,
              habitType !== undefined &&
                (habitType === "bad"
                  ? styles.emojiChoiceViewBadHabit
                  : styles.emojiChoiceViewGoodHabit),
            ]}
            onPress={() => setIsEmojiPickerOpen(true)}
          >
            {!chosenEmoji && (
              <Text center color="#7f8c8d">
                Click to choose an emoji
              </Text>
            )}
            {chosenEmoji && (
              <Text center text10>
                {chosenEmoji}
              </Text>
            )}
          </TouchableOpacity>
          <TextField
            placeholder="Habit's name"
            fieldStyle={styles.habitNameField}
            maxLength={30}
            enableErrors
            validateOnChange
            showCharCounter
            showSoftInputOnFocus
            value={habitName}
            onChangeText={(text) => {
              setHabitName(text);
            }}
          />
        </View>

        <View style={styles.habitTypeContainer}>
          <Text text70M>How would you like to classify this habit?</Text>
          <RadioGroup
            initialValue={habitType}
            onValueChange={setHabitType}
            animated
            style={styles.habitTypeRadioGroup}
          >
            <RadioButton
              labelStyle={styles.habitTypeRadioLabel}
              value="good"
              label="😇 Good habit"
            />
            <RadioButton
              labelStyle={styles.habitTypeRadioLabel}
              value="bad"
              label="😈 Bad habit"
            />
          </RadioGroup>
        </View>
        <View style={styles.actionButtons}>
          <Button
            size={Button.sizes.large}
            label="Add habit to list"
            backgroundColor={Colors.green30}
            onPress={() => {
              if (!chosenEmoji) {
                setToastText("Please pick an emoji to represent this habit");
                setShouldShowToast(true);
                return;
              }
              if (!habitName) {
                setToastText("Please pick a habit name");
                setShouldShowToast(true);
                return;
              }
              if (!habitType) {
                setToastText("Please pick a habit type");
                setShouldShowToast(true);
                return;
              }

              addCustomHabit({
                name: habitName,
                type: habitType,
                emoji: chosenEmoji,
              })
                .catch((e) => console.error(e))
                .finally(() => {
                  setCurrentView("main");
                });
            }}
          />
          <Button
            size={Button.sizes.medium}
            label="Cancel"
            backgroundColor="white"
            color="#7f8c8d"
            outlineColor="#7f8c8d"
            onPress={() => setCurrentView("main")}
          />
        </View>
      </View>
      <View>
        <EmojiPicker
          expandable
          enableSearchBar
          enableSearchAnimation
          enableCategoryChangeAnimation
          hideSearchBarClearIcon={false}
          onEmojiSelected={({ emoji }) => setChosenEmoji(emoji)}
          open={isEmojiPickerOpen}
          onClose={() => setIsEmojiPickerOpen(false)}
        />
      </View>
      <Toast
        visible={shouldShowToast}
        position={"bottom"}
        autoDismiss={2000}
        backgroundColor="#e74c3cda"
        message={toastText}
        onDismiss={() => {
          setShouldShowToast(false);
        }}
        onClose={() => {
          setShouldShowToast(false);
        }}
      />
    </ScrollView>
  );
};

export { AddACustomHabitModalPart };
