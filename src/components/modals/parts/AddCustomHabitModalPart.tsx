import {
  Button,
  Colors,
  RadioButton,
  RadioGroup,
  Spacings,
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
import {
  getPrimaryHabitTypeColor,
  getSecondaryHabitTypeColor,
} from "../../../utils/colors";

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
      <View
        style={{
          flexDirection: "row",
          gap: Spacings.s4,
          justifyContent: "space-between",
          alignItems: "center",
          padding: Spacings.s6,
          paddingBottom: 0,
        }}
      >
        <Text text60 style={{ width: "auto", color: "#212427" }}>
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
      <View
        style={{
          marginTop: Spacings.s6,
          flexDirection: "column",
          gap: Spacings.s8,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: Spacings.s6,
          paddingBottom: Spacings.s4,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: Spacings.s8,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "center",
              width: 150,
              height: 150,
              borderRadius: "50%",
              borderWidth: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderColor:
                chosenEmoji === undefined
                  ? "#7f8c8d"
                  : getSecondaryHabitTypeColor(habitType),
              backgroundColor:
                chosenEmoji === undefined
                  ? "transparent"
                  : getPrimaryHabitTypeColor(habitType),
            }}
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
            fieldStyle={{
              borderBottomWidth: 1,
              borderColor: "#7f8c8d",
              padding: Spacings.s2,
              width: "100%",
            }}
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

        <View
          style={{
            flexDirection: "column",
            gap: Spacings.s3,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text text70M>How would you like to classify this habit?</Text>
          <RadioGroup
            initialValue={habitType}
            onValueChange={setHabitType}
            animated
            style={{
              flexDirection: "row",
              gap: Spacings.s5,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <RadioButton
              labelStyle={{ marginLeft: Spacings.s2 }}
              value="good"
              label="😇 Good habit"
            />
            <RadioButton
              labelStyle={{ marginLeft: Spacings.s2 }}
              value="bad"
              label="😈 Bad habit"
            />
          </RadioGroup>
        </View>
        <View
          style={{
            marginTop: Spacings.s2,
            flexDirection: "row",
            width: "100%",
            gap: Spacings.s3,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
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
